console.log('hello world');

var myKey = JSON.parse(apiKey);
console.log(myKey[0]);
myKey = myKey[0].key;

$(document).ready(function(){
	let url = 'http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=' + myKey;
	var i;

	$.ajax({
		url : url,
		method : 'GET',
		dataType : 'Json',

		beforeSend : function(){
			$('.progress').show();
		},
		complete : function(){
			$('.progress').hide();
		},
		success : function(news){
			let output = '';
			let latestNews = news.articles;
			console.log(latestNews);

			for(i in latestNews){
				output += 
					`<div class="col-4 py-4">
						<div class="card shadow-sm">
							<img src="${latestNews[i].urlToImage} alt="article image" style="width:100%;">
							<div class="card-body">
								<h4>${latestNews[i].title}</h4>
								<h5 class="small">${latestNews[i].author} - ${latestNews[i].source.name}</h5>
								<p>${latestNews[i].description}</p>
							</div>
							<div class="card-footer">
								<a href="${latestNews[i].url}" target="_blank"><button class="btn btn-primary">Full Article</button></a>
							</div>
						</div>
					</div>`;
			}

			if(output !== ''){
				$('#newsResults').html(output);
			}
		},
		error : function(){
			alert('An error has occured trying to load your page');
		}
	});
});
