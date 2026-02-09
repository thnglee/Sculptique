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
        // Check if Champs checkout mode is enabled
        if ($(".product-selector_atc").attr("data-mode-champs") == "true") {
            var newUrl = $(".product-selector_outer.active_block").find(".product-selector_block.active").attr("data-champs-url");
            window.location.href = newUrl;
            return;
        }
        
        // Note: Shopify cart API calls have been removed as they don't work in static HTML
        // The only functional checkout path is the Champs redirect above
        console.log("Add to cart clicked - Champs checkout mode not enabled");
    })
});
