$(document).ready(function () {
    $(".custom_atc_button").click(function () {
        var currentId = $(this).attr("data-id"),
            mode = $(this).attr("data"),
            sellingPlanId = $(this).attr("data-sub-id"),
            quantityCur = $(this).closest(".formCont").find(".gf_pq_qty").val();
        console.log(mode, "MODE"), mode == "sub" ? $.ajax({
            type: "POST",
            url: "/cart/clear.js",
            success: function () {
                $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: {
                        id: currentId,
                        quantity: quantityCur,
                        selling_plan: sellingPlanId
                    },
                    success: function () {
                        window.location.href = "/checkout"
                    }
                })
            }
        }) : $.ajax({
            type: "POST",
            url: "/cart/clear.js",
            success: function () {
                $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: {
                        id: currentId,
                        quantity: quantityCur
                    },
                    success: function () {
                        window.location.href = "/checkout"
                    }
                })
            }
        })
    }), $(".custom_atc_button_cart").click(function () {
        var currentId = $(this).attr("data-id"),
            mode = $(this).attr("data"),
            sellingPlanId = $(this).attr("data-sub-id"),
            quantityCur = $(this).closest(".formCont").find(".gf_pq_qty").val();
        console.log(mode, "MODE"), mode == "sub" ? $.ajax({
            type: "POST",
            url: "/cart/clear.js",
            success: function () {
                $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: {
                        id: currentId,
                        quantity: quantityCur,
                        selling_plan: sellingPlanId
                    },
                    success: function () { }
                })
            }
        }) : $.ajax({
            type: "POST",
            url: "/cart/clear.js",
            success: function () {
                $.ajax({
                    type: "POST",
                    url: "/cart/add.js",
                    data: {
                        id: currentId,
                        quantity: quantityCur
                    },
                    success: function () { }
                })
            }
        })
    }), $(".product_tab-block").click(function () {
        $(this).toggleClass("active"), $(this).find(".product_tab-content").slideToggle()
    }), $(".main_product-btn").click(function () {
        $(".nutrition_popup-outer").hide()
    }), $(".nutrition_popup-outer").click(function () {
        $(".nutrition_popup-outer").hide()
    }), $(".main_product-nutrition-info").click(function () {
        $(".nutrition_popup-outer").css("display", "flex")
    }), $(".product-inside_block").click(function () {
        $(this).toggleClass("active"), $(this).find(".product-inside_block-content").slideToggle()
    }), $(".product_faq-box").click(function () {
        $(this).toggleClass("active"), $(this).find(".product_faq-content").slideToggle()
    }), $(".product_carousel-prev").click(function () {
        $(this).closest(".product_carousel-outer").find(".slick-prev").trigger("click")
    }), $(".product_carousel-next").click(function () {
        $(this).closest(".product_carousel-outer").find(".slick-next").trigger("click")
    }), $(document).on("click", ".product_ugc-video", function () {
        const video = $(this).find("video").get(0),
            playOverlay = $(this).find(".product_ugc-play");
        if (video && !video.paused && !video.ended) {
            video.pause(), video.currentTime = 0, video.muted = !0, playOverlay.show();
            return
        }
        $(".product_ugc-play").show(), $(".product_ugc-container video").each(function () {
            this.pause(), this.currentTime = 0, this.muted = !0
        }), video && (video.muted = !1, video.currentTime = 0, video.play(), playOverlay.hide())
    }), $(".product-lymph-ingredient").click(function () {
        $(this).find(".product_lymph-ingr-content").slideToggle()
    }), $(".product_primary-btn.scrolling").click(function (evt) {
        evt.preventDefault(), $("html, body").animate({
            scrollTop: $(".main_product-container").offset().top - 100
        }, 500)
    });

    function getBusinessDayFromToday(offsetDays) {
        let date = new Date,
            addedDays = 0;
        for (; addedDays < offsetDays;) {
            date.setDate(date.getDate() + 1);
            const day = date.getDay();
            day !== 0 && day !== 6 && addedDays++
        }
        return date
    }

    function formatDate(date) {
        const weekday = date.toLocaleDateString(void 0, {
            weekday: "long"
        }),
            day = date.getDate(),
            month = date.toLocaleDateString(void 0, {
                month: "long"
            });
        return `${weekday}, ${day} ${month}`
    }
    const targetDate = getBusinessDayFromToday(3),
        formattedDate = formatDate(targetDate);
    $(".col_pp_delivery__Date").text(formattedDate), $(".home_banner-reviews").slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        dots: !0
    }), $(".main_product-image-carousel").slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        asNavFor: ".main_product-image-carousel_thumbs",
        prevArrow: "<button type='button' class='slick-prev pull-left'><img class='left_arrow' src='assets/imgi_12_iconamoon_arrow-up-2-thin_1.png'/></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><img class='right_arrow' src='assets/imgi_21_iconamoon_arrow-up-2-thin.png'/></button>"
    }), $(".main_product-image-carousel_thumbs").slick({
        infinite: !0,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: !1,
        focusOnSelect: !0,
        asNavFor: ".main_product-image-carousel"
    }), $(".product_ugc-container").slick({
        infinite: !1,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        prevArrow: "<button type='button' class='slick-prev pull-left'><img class='left_arrow' src='assets/imgi_12_iconamoon_arrow-up-2-thin_1.png'/></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><img class='right_arrow' src='assets/imgi_21_iconamoon_arrow-up-2-thin.png'/></button>",
        responsive: [{
            breakpoint: 677,
            settings: {
                slidesToShow: 1.3,
                slidesToScroll: 1
            }
        }]
    }), $(".product_review-container").slick({
        infinite: !1,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        allowTouchMove: !0,
        prevArrow: "<button type='button' class='slick-prev pull-left'><img class='left_arrow' src='assets/imgi_12_iconamoon_arrow-up-2-thin_1.png'/></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><img class='right_arrow' src='assets/imgi_21_iconamoon_arrow-up-2-thin.png'/></button>",
        responsive: [{
            breakpoint: 677,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1
            }
        }]
    })
});
//# sourceMappingURL=/cdn/shop/t/2/assets/sitewide.js.map?v=57755797918489078991769809962