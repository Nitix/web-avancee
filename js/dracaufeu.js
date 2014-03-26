/**
 * Created by Guillaume on 18/03/14.
 */
$(Document).ready(function(){

    $(".item").on("click", function(){
        var id = $(this).data('id');
        $.ajax({
            type : "GET",
            url : "index.php",
            data : { "id" : id}
        }).done(function(res){
            console.log(res);
        });
    });
});