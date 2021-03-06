jQuery(window).on("load", function () {
    console.log(
        `%c
  Contact me:
  P: 0965.899.230
  E: thanhthinhcntt@gmail.com
`,
        "background: #4caf50; color: #fff; font-size: 32px;"
    );
    $("#preloader").fadeOut(500);
    $("#main-wrapper").addClass("show");
});

(function ($) {
    var headerHeight = parseInt($(".onepage").css("height"), 10);
    $(".scroll")
        .unbind()
        .on("click", function (event) {
            event.preventDefault();

            if (this.hash !== "") {
                var hash = this.hash;
                var seactionPosition = $(hash).offset().top;
                var headerHeight = parseInt($(".onepage").css("height"), 10);

                $("body").scrollspy({
                    target: ".scroll-nav",
                    offset: headerHeight + 2,
                });

                var scrollTopPosition = seactionPosition - headerHeight;

                $("html, body").animate(
                    {
                        scrollTop: scrollTopPosition,
                    },
                    800,
                    function () { }
                );
            }
        });
    $("body").scrollspy({ target: ".scroll-nav", offset: headerHeight + 2 });

    $(".header").css("height", "");
    var headerHeight = $(".header").height();
    $(".header").css("height", headerHeight);

    //  Header fixed
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".header").addClass("animated slideInDown fixed"), 3000;
        } else {
            $(".header").removeClass("animated slideInDown fixed"), 3000;
        }
    });

    $(function () {
        for (
            var nk = window.location,
            o = $(".menu a, .sub-menu a")
                .filter(function () {
                    return this.href == nk;
                })
                .addClass("active")
                .parent()
                .addClass("active");
            ;

        ) {
            // console.log(o)
            if (!o.is("li")) break;
            o = o.parent().addClass("show").parent().addClass("active");
        }
    });
    /*=========================================================================
            Initialize smoothscroll plugin
        =========================================================================*/
    smoothScroll.init({
        offset: 60,
    });

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            $("#scroll-to-top").fadeIn();
        } else {
            $("#scroll-to-top").fadeOut();
        }
    });
    $(".sidebar-right-trigger").on("click", function () {
        $(".sidebar-right").toggleClass("show");
    });

    $('[data-toggle="tooltip"]').tooltip();
    $(".data-close").on("click", function () {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    /* Magnific Popup ============ */
    /* magnificPopup function */
    if (jQuery(".mfp-gallery").length) {
        jQuery(".mfp-gallery").magnificPopup({
            delegate: ".mfp-link",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr("title") + "<small></small>";
                },
            },
        });
    }
    /* magnificPopup function end */

    /* magnificPopup for paly video function */
    if (jQuery(".mfp-video").length) {
        jQuery(".mfp-video").magnificPopup({
            type: "iframe",
            iframe: {
                markup:
                    '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title">Some caption</div>' +
                    "</div>",
            },
            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr("title");
                },
            },
        });
    }

    /* magnificPopup for paly video function end*/
    if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").length) {
        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false,
        });
    }

    jQuery(window).on("load", function () {
        getDataProvinceCovidVietNam();
        //getVaccinedDataVietNam();
    });

    // function getDataCovid() {
    //   const $url = "https://api.covid19api.com/summary";
    //   const CODE_VIETNAM = "VN";
    //   jQuery.ajax({
    //     method: "GET",
    //     url: $url,
    //     dataType: "json",
    //     beforeSend: function (xhr) {},
    //     success: function (response) {
    //       if (Object.entries(response).length > 0) {
    //         var country = response.Countries.find(
    //           (n) => n.CountryCode == CODE_VIETNAM
    //         );
    //         if (Object.entries(country).length > 0) {
    //           // jQuery("#VN_Positive").text(country.TotalConfirmed);
    //           // jQuery("#VN_Death").text(country.TotalDeaths);
    //           // jQuery("#VN_Recovered").text(country.TotalRecovered);
    //         }
    //       }
    //     },
    //     error: function (response) {
    //       alert("Something is wrong, Please wait.");
    //     },
    //     fail: function (response) {
    //       alert("Something is wrong, Please wait.");
    //     },
    //   });
    // }

    function getTotalCovidVietNam(data) {
        var todaycases = 0;
        var total = data[0][2];
        for (i = 0; i < data.length; i++) {
            if (data[i][Object.keys(data[0]).length - 1] > 0)
                todaycases += data[i][Object.keys(data[0]).length - 1];
        }
        jQuery("#VN_Positive").text(total);
        jQuery("#VN_Total").text(todaycases);
    }

    function getDataProvinceCovidVietNam() {
        const $url = "https://tuoitre.io/covid";
        var provinces = [];
        jQuery.ajax({
            method: "GET",
            url: $url,
            dataType: "json",
            beforeSend: function (xhr) { },
            success: function (response) {
                var dataSet = [];
                if (Object.entries(response).length > 0 != null) {
                    getTotalCovidVietNam(response);
                    response.map(function (province, index) {
                        if (index > 0) {
                            let upDownCases =
                                province[Object.keys(response[0]).length - 1] -
                                province[Object.keys(response[0]).length - 2];
                            provinces.push({
                                id: index,
                                name: province[1],
                                newcases:
                                    province[Object.keys(response[0]).length - 1] > 0
                                        ? province[Object.keys(response[0]).length - 1]
                                        : 0,
                                yesterdaycases:
                                    province[Object.keys(response[0]).length - 2] > 0
                                        ? province[Object.keys(response[0]).length - 2]
                                        : 0,
                                totalcases: province[2],
                                updowncases:
                                    upDownCases > 0
                                        ? `T??ng ${upDownCases}`
                                        : upDownCases == 0
                                            ? 0
                                            : `Gi???m ${Math.abs(upDownCases)}`,
                            });
                        }
                    });
                    getTopProvinceCovidVietNam(provinces);
                    var spread = Object.keys(provinces).length;
                    jQuery("#VN_Spread").text(`${spread}/63`);
                    jQuery.each(provinces, function (index, data) {
                        var rowValues = {};
                        rowValues[0] = data.id;
                        rowValues[1] = data.name;
                        rowValues[2] = data.yesterdaycases;
                        rowValues[3] = data.newcases;
                        rowValues[4] = data.updowncases;
                        rowValues[5] = data.totalcases;
                        dataSet.push(rowValues);
                    });
                    $("#ProvinceDataTable").DataTable({
                        language: {
                            url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
                        },
                        data: dataSet,
                        columns: [
                            { title: "STT" },
                            { title: "T???nh Th??nh" },
                            { title: "H??m qua" },
                            { title: "H??m nay" },
                            { title: "T??ng/Gi???m" },
                            { title: "T???ng" },
                        ],
                        order: [[0, "asc"]],
                    });
                }
            },
            error: function (response) {
                alert("Something is wrong, Please wait.");
            },
            fail: function (response) {
                alert("Something is wrong, Please wait.");
            },
        });
    }
    // append html jquery to owlCarousel not work because i use case it ::))))
    function getTopProvinceCovidVietNam(data) {
        data.forEach((province) => {
            if (
                jQuery("#TopCovidProvince [data-country-id='" + province.id + "']")
                    .length > 0
            ) {
                jQuery(
                    "#TopCovidProvince [data-country-id='" + province.id + "'] .title"
                ).text(province.name);
                jQuery(
                    "#TopCovidProvince [data-country-id='" +
                    province.id +
                    "'] .dz-totalcases"
                ).text(province.totalcases);
                jQuery(
                    "#TopCovidProvince [data-country-id='" +
                    province.id +
                    "'] .dz-newcases"
                ).text(province.newcases);
            }
        });
    }

    function getVaccinedDataVietNam() {
        const $url = "https://vnexpress.net/microservice/sheet/type/vaccine_data_vietnam_city";
        jQuery.ajax({
            crossOrigin: true,
            url: $url,
            method: "GET",
            contentType: "jsonp",
            // headers: {
            //     'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/'
            // },
            beforeSend: function (xhr) { },
            success: function (response) {
                console.info(response);
            },
            error: function (response) {
                alert("Something is wrong, Please wait.");
            },
            fail: function (response) {
                alert("Something is wrong, Please wait.");
            },
        });
    }
    jQuery(document).ready(function () {
        jQuery(".covid-province-info").owlCarousel({
            loop: true,
            center: false,
            margin: 0,
            nav: true,
            autoplaySpeed: 3000,
            navSpeed: 3000,
            paginationSpeed: 3000,
            slideSpeed: 3000,
            smartSpeed: 3000,
            autoplay: 3000,
            dots: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                1024: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
                1400: {
                    items: 4,
                },
            },
        });
    });
})(jQuery);

//ripple effect on button
Waves.init();
Waves.attach(".wave-effect");
Waves.attach(".btn");
Waves.attach("button");
