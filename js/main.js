(function() {
    function showElement(element) {
        element.classList.add("in-view");
    }

    function executeLazyFunction(element) {
        var lazyFunctionName = element.getAttribute("data-lazy-function");
        // var lazyFunctionName = "hideCover";
        var lazyFunction = window.lazyFunctions[lazyFunctionName];
        if (!lazyFunction) return;
        lazyFunction(element);
    }

    var ll = new LazyLoad({
        unobserve_entered: true,
        unobserve_completed: true,
        elements_selector: ".lazy",
        thresholds: "50px",
        callback_enter: showElement
    });

    var hamburger = document.getElementById("hamburger");
    var navMobile = document.getElementById("nav-mobile");
    var navActive = false;

    hamburger.onclick = function() {
        if (!navActive) {
            hamburger.classList.add('is-active');
            navMobile.classList.add('is-active');
            navActive = true;
        } else {
            hamburger.classList.remove('is-active');
            navMobile.classList.remove('is-active');
            navActive = false;
        }

    }

    window.addEventListener("scroll", function(e) {

        // What % down is it? 
        // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
        // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
        var scrollPercentage = (document.documentElement.scrollTop) / (document.documentElement.clientHeight) * 12;
        // console.log(scrollPercentage);
        var height = document.documentElement.clientHeight / scrollPercentage;
        if ((document.documentElement.clientHeight / scrollPercentage) > document.documentElement.clientHeight)
            height = document.documentElement.clientHeight;
        if (document.documentElement.scrollTop > 5) {
            if(document.documentElement.clientHeight > document.documentElement.clientWidth)
                height = document.documentElement.clientHeight * 3 / 10;
            else 
                height = document.documentElement.clientHeight * 3 / 10;
            document.getElementById("work-header").setAttribute("style", "height:" + height + "px; opacity: 0");

            console.log(height);
        } else {
            height = document.documentElement.clientHeight;
            document.getElementById("work-header").setAttribute("style", "height:" + height + "px; opacity: 1");
        }

        console.log(document.documentElement.scrollTop);
    });


var fAll= document.getElementById("filter-all");
var fBranding = document.getElementById("filter-branding");
var fPackaging = document.getElementById("filter-packaging");
var fWebdesign = document.getElementById("filter-webdesign");


fAll.onclick = function() {
    document.getElementsByClassName('filter active')[0].classList.remove('active');
    fAll.classList.add('active');
    document.getElementById("works-index").classList.remove('filter-packaging');
    document.getElementById("works-index").classList.remove('filter-webdesign');
    document.getElementById("works-index").classList.remove('filter-branding');
}

fBranding.onclick = function() {
    document.getElementsByClassName('filter active')[0].classList.remove('active');
    fBranding.classList.add('active');
    document.getElementById("works-index").classList.remove('filter-packaging');
    document.getElementById("works-index").classList.remove('filter-webdesign');
    document.getElementById("works-index").classList.add('filter-branding');
}

fPackaging.onclick = function() {
    document.getElementsByClassName('filter active')[0].classList.remove('active');
    fPackaging.classList.add('active');
    document.getElementById("works-index").classList.remove('filter-branding');
    document.getElementById("works-index").classList.remove('filter-webdesign');
    document.getElementById("works-index").classList.add('filter-packaging');
}

fWebdesign.onclick = function() {
    document.getElementsByClassName('filter active')[0].classList.remove('active');
    fWebdesign.classList.add('active');
    document.getElementById("works-index").classList.remove('filter-packaging');
    document.getElementById("works-index").classList.remove('filter-branding');
    document.getElementById("works-index").classList.add('filter-webdesign');
}

    var scroll = new SmoothScroll('.filters a', {
        speed: 600, // Integer. Amount of time in milliseconds it should take to scroll 1000px
        speedAsDuration: false,
        easing: 'ease',
        updateURL: true,
        popstate: true
    });

})();