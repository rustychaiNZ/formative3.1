var myKey = JSON.parse(apiKey);
myKey = myKey[0].key;

// Lists of codes provided by James Murray
var languages = [{
	code: 0,
	name: 'All'
},{
	code: 'ar',
	name: 'Arabic'
},{
	code: 'de',
	name: 'German'
},{
	code: 'en',
	name: 'English'
},{
	code: 'es',
	name: 'Spanish'
},{
	code: 'fr',
	name: 'French'
},{
	code: 'he',
	name: 'Hewbrew'
},{
	code: 'it',
	name: 'Italian'
},{
	code: 'nl',
	name: 'Dutch'
},{
	code: 'no',
	name: 'Norwegian'
},{
	code: 'pt',
	name: 'Portuguese'
},{
	code: 'ru',
	name: 'Russian'
},{
	code: 'se',
	name: 'Northern Sami'
},{
	code: 'zh',
	name: 'Chinese'
}];

var countrys = [{
	code: 0,
	name: 'All'
},{
	code: 'ar',
	name: 'Argentina',
},{
	code: 'au',
	name: 'Australia',
},{
	code: 'at',
	name: 'Austria',
},{
	code: 'be',
	name: 'Belgium',
},{
	code: 'br',
	name: 'Brazil',
},{
	code: 'bg',
	name: 'Bulgaria',
},{
	code: 'ca',
	name: 'Canada',
},{
	code: 'cn',
	name: 'China',
},{
	code: 'co',
	name: 'Colombia',
},{
	code: 'cu',
	name: 'Cuba',
},{
	code: 'cz',
	name: 'Czechia',
},{
	code: 'eg',
	name: 'Egypt',
},{
	code: 'fr',
	name: 'France',
},{
	code: 'de',
	name: 'Germany',
},{
	code: 'gr',
	name: 'Greece',
},{
	code: 'hk',
	name: 'Hong Kong',
},{
	code: 'hu',
	name: 'Hungary',
},{
	code: 'in',
	name: 'India',
},{
	code: 'id',
	name: 'Indonesia',
},{
	code: 'ie',
	name: 'Ireland',
},{
	code: 'il',
	name: 'Israel',
},{
	code: 'it',
	name: 'Italy',
},{
	code: 'jp',
	name: 'Japan',
},{
	code: 'kr',
	name: 'Korea',
},{
	code: 'lv',
	name: 'Latvia',
},{
	code: 'lt',
	name: 'Lithuania',
},{
	code: 'my',
	name: 'Malaysia',
},{
	code: 'mx',
	name: 'Mexico',
},{
	code: 'ma',
	name: 'Morocco',
},{
	code: 'nl',
	name: 'Netherlands',
},{
	code: 'nz',
	name: 'New Zealand',
},{
	code: 'ng',
	name: 'Nigeria',
},{
	code: 'no',
	name: 'Norway',
},{
	code: 'ph',
	name: 'Philippines',
},{
	code: 'pl',
	name: 'Poland',
},{
	code: 'pt',
	name: 'Portugal',
},{
	code: 'ro',
	name: 'Romania',
},{
	code: 'ru',
	name: 'Russian Federation',
},{
	code: 'sa',
	name: 'Saudi Arabia',
},{
	code: 'rs',
	name: 'Serbia',
},{
	code: 'sg',
	name: 'Singapore',
},{
	code: 'sk',
	name: 'Slovakia',
},{
	code: 'si',
	name: 'Slovenia',
},{
	code: 'za',
	name: 'South Africa',
},{
	code: 'se',
	name: 'Sweden',
},{
	code: 'ch',
	name: 'Switzerland',
},{
	code: 'tw',
	name: 'Taiwan',
},{
	code: 'th',
	name: 'Thailand',
},{
	code: 'tr',
	name: 'Turkey',
},{
	code: 'ua',
	name: 'Ukraine',
},{
	code: 'ae',
	name: 'United Arab Emirates',
},{
	code: 'gb',
	name: 'United Kingdom',
},{
	code: 'us',
	name: 'United States',
},{
	code: 've',
	name: 'Venezuela',
}];

var categorys = [{
	code: 'business',
	name: 'Business'
},{
	code: 'entertainment',
	name: 'Entertainment'
},{
	code: 'general',
	name: 'General'
},{
	code: 'health',
	name: 'Health'
},{
	code: 'science',
	name: 'Science'
},{
	code: 'sports',
	name: 'Sports'
},{
	code: 'technology',
	name: 'Technology'
}];

// Function that auto fills broken images
function backupImage(imageSource){
	imageSource.src = "assets/temporary.jpg";
	imageSource.onerror = "";
	return true;
}

$(document).ready(function(){
	
	var i;
	var country;
	var category;
	var countryCode = '';
	var categoryCode = '';
	var endPoint;
	var searchTerm;
	var userInputtedSearchTerm = '';

	// Function for finding user's input for category
	function getCatagory(){
		// Gets user input for country and category and stores them in variables
		category = document.getElementById('selectCatagory').value;
		// Takes user's input for category and converts and checks for code
		for(i = 0; i < categorys.length; i++){
			// Changes users input to a code
			if ((category === categorys[i].name) && (country !== 'noCountry')){
				categoryCode = '&category=' + categorys[i].code;
				endPoint = 'top-headlines';
			} 
			// If user has searched for a category on it's own
			else if ((category === categorys[i].name) && (country === 'noCountry')){
				categoryCode = 'category=' + categorys[i].code;
				countryCode = '';
				endPoint = 'top-headlines';
			}
			else if ((category === categorys[i].name) && (country === 'noCountry') && (userInputtedSearchTerm === '')){
				categoryCode = 'category=' + categorys[i].code;
				countryCode = '';
				endPoint = 'top-headlines';
			}
		}
	}
	// Get catagory ends
	
	// Function for finding user's input for country
	function getCountry(){
		// Gets user input for country and category and stores them in variables
		country = document.getElementById('selectCountry').value;
		// Takes user's input for country and coverts and checks for code
		for(i = 0; i < countrys.length; i++){
			// Changes users input to a code
			if ((country === countrys[i].name) && (category === 'noCatagory')){
				countryCode = 'country=' + countrys[i].code;
				categoryCode = '';
				endPoint = 'top-headlines';
			} 
			else if((country === countrys[i].name) && (category !== 'noCatagory')){
				countryCode = 'country=' + countrys[i].code;
				endPoint = 'top-headlines';
			} 
			// If user hasn't selected a catagory, then display error message
			else if ((country === 'noCountry') && (category === 'noCatagory') && (searchTerm === '')){ 
				countryCode = '';
				categoryCode = '';
				document.getElementById('messages').innerHTML += 
					'<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
						'<strong>O Oh!</strong> Please select a country, a category or enter a search query.' +
						'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
							'<span aria-hidden="true">&times;</span>' +
						'</button>' +
					'</div>';
				break;
			}
		}
	}

	// Function for user search queries
	function searchAll(){
		// Takes user's input for search query 
		userInputtedSearchTerm = document.getElementById('searchQuery').value;
		// Saves user's search term and adds it to url
		if(userInputtedSearchTerm !== ''){
			endPoint = 'everything';
			searchTerm = 'q=' + userInputtedSearchTerm + '&language=en';
			countryCode = '';
			categoryCode = '';

			document.getElementById('searchQuery').value = '';
			document.getElementById('selectCatagory').value = 'noCatagory';
			document.getElementById('selectCountry').value = 'noCountry';
			// Gives verification to the user
			document.getElementById('newsResults').innerHTML = '';
			document.getElementById('messages').innerHTML += '<h3>Query:<b> ' + userInputtedSearchTerm + '</b></h3>';
		}
		// If user hasn't entered anything in the search query box, then the code will be removed from the url
		else if(userInputtedSearchTerm == ''){
			searchTerm = '';
		}
	}

	$('#searchNews').click(function(){
		// Clears fields for new site message and articles to be displayed
		document.getElementById('messages').innerHTML = '';
		document.getElementById('newsResults').innerHTML = '';

		// Search based off of category
		getCatagory();
		// Search based of selected country
		getCountry();
		// Search based off of user's input
		searchAll();
		// Url used that is dynamically changed based off of what the user selects
		var url = 'http://newsapi.org/v2/' + endPoint + '?' + countryCode + categoryCode + searchTerm + '&apiKey=' + myKey; 

		// Gathers and outputs news articles
		$.ajax({
			url : url,
			method : 'GET',
			dataType : 'Json',
	
			beforeSend : function(){
				$('.spinner-border').show(); 
			},
			complete : function(){ 
				$('.spinner-border').hide();
			},
			success : function(news){
				var output = '';
				var latestNews = news.articles;
				
				// Displays articles as cards
				for(i in latestNews){
					// Outputs the articles in a card format
					output += 
						'<div class="col-md-6 col-lg-4 col-xl-3 d-flex align-self-stretch py-4">' +
							'<div class="card shadow-sm">' +
								'<img onerror="backupImage(this)" src="' + latestNews[i].urlToImage + '" alt="article image" style="width:100%;">' +
								'<div class="card-body">' +
									'<h4>' + latestNews[i].title + '</h4>' +
									'<h5 class="small text-secondary">' + latestNews[i].author + ' - ' + latestNews[i].source.name + '</h5>' +
									'<p>' + latestNews[i].description + '</p>' +
								'</div>' +
								'<div class="card-footer">' +
									'<a href="' + latestNews[i].url + '" target="_blank"><button class="btn btn-primary">Full Article</button></a>' +
								'</div>' +
							'</div>' +
						'</div>';
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
});
