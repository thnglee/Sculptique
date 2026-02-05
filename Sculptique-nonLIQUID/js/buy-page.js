$(document).ready(function () {
    $(".product-selector_block").click(function () {
        $(this).closest(".product-selector_outer").find(".product-selector_block").removeClass("active"), $(this).addClass("active");
        const subDiscount = $(this).data("selling-plan-discount");
        subDiscount && $(".pp_var_autoship_title span").text(subDiscount);
        var indexOpt = $(this).attr("data-index");
        $(".product_atc-refills").addClass("hided"), $('.product_atc-refills[data="' + indexOpt + '"]').removeClass("hided"), $(".cta-note.changeble").addClass("hided"), $('.cta-note.changeble[data-id="' + indexOpt + '"]').removeClass("hided")
    }), $(".pp_var_autoship").click(function () {
        $(this).toggleClass("disabled"), $(".pp_var_autoship").hasClass("disabled") ? ($(".product_atc-footer-line").addClass("hided"), $('.product-selector_outer[data="sub"]').removeClass("active_block"), $('.product-selector_outer[data="otp"]').addClass("active_block")) : ($('.product-selector_outer[data="sub"]').addClass("active_block"), $('.product-selector_outer[data="otp"]').removeClass("active_block"), $(".product_atc-footer-line").removeClass("hided"))
    }), $(".product-selector_atc").click(function () {
        $.getJSON("/cart.js", function (cart) {
            var existingIds = cart.items.map(function (item) {
                return item.id
            });
            if ($(".product-selector_atc").attr("data-mode-champs") == "true") {
                var newUrl = $(".product-selector_outer.active_block").find(".product-selector_block.active").attr("data-champs-url");
                window.location.href = newUrl;
                return
            }
            var items = [],
                currentId = $(".product-selector_outer.active_block").find(".product-selector_block.active").attr("data-id"),
                mode = $(".product-selector_outer.active_block").attr("data"),
                currentSellingPlan = $(".product-selector_outer.active_block").find(".product-selector_block.active").attr("data-selling-plan");
            mode == "sub" ? items.push({
                id: currentId,
                quantity: 1,
                selling_plan: currentSellingPlan
            }) : items.push({
                id: currentId,
                quantity: 1
            });
            var giftMode = $(".product-selector_atc").attr("data-gifts");
            giftMode == "true" && $('.product-selector_block[data-id="' + currentId + '"]').find(".variant_gift-data").each(function () {
                var giftId = $(this).attr("data-id");
                existingIds.includes(parseInt(giftId)) || items.push({
                    id: giftId,
                    quantity: 1
                })
            });
            var goToCheckout = $(".product-selector_atc").attr("data-checkout");
            goToCheckout == "true" ? ($("kaching-cart").hide(), items.length > 0 && $.ajax({
                type: "POST",
                url: "/cart/clear.js",
                dataType: "json",
                success: function () {
                    $.ajax({
                        type: "POST",
                        url: "/cart/add.js",
                        data: {
                            items
                        },
                        dataType: "json",
                        success: function () {
                            window.location.href = "/checkout"
                        },
                        error: function () {
                            alert("Error adding item to the cart.")
                        }
                    })
                },
                error: function () {
                    alert("Error clearing the cart.")
                }
            })) : items.length > 0 && $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: {
                    items
                },
                dataType: "json",
                success: function () { },
                error: function () {
                    alert("Error adding item to the cart.")
                }
            })
        })
    })
});
//# sourceMappingURL=/cdn/shop/t/2/assets/buy-page.js.map?v=32301255548912880311770117296

