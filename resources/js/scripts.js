$(function() {
    var $image     = $('#target-image');
    var $range     = $('#range');
    var $new_color = $('#new-color');
    var $color_box = $('#color-box');
    var $output    = $('#output'); 
    var $download  = $('#btn-download');

    var resolution = 32;
    var base_colors = ["ffcc00", "bbcc00", "33dd11", "aeaeae"];
    var alpha = 1;

    var pixelOpts = [{resolution: resolution, base_colors: base_colors, alpha: alpha}];            
    var pixelImage = $image.get(0).closePixelate(pixelOpts);            

    $range.on("change mousemove", function() {
        var res = parseInt( this.value, 10 );
        res = Math.floor(res / 2) * 2;
        res = Math.max(4, Math.min(100, res));
        $output.text(res);                                

        pixelOpts = [{resolution: res, base_colors: base_colors}];
        pixelImage.render(pixelOpts);
    });

    $new_color.keypress(function(e){
        if(e.which === 13) {
            var new_color = $(this).val();
            var isHex  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(new_color);                    
            if(isHex) {
                base_colors.push(new_color);
                pixelImage.render(pixelOpts);
                add_new_color(new_color);
                $new_color.val('');
            }
            else {
                console.log('input not valid!');
            }
        }                
    });

    $.each(base_colors, function(){
        add_new_color(this);
    });

    $download.on('click', function (e) {
        var dataURL = pixelImage.canvas.toDataURL('image/png');
        $(this).attr('href', dataURL);                
    }); 

    function add_new_color(color){
        $color_box.append('<li style="background:#' + color + '"></li>');
    }                                               

});