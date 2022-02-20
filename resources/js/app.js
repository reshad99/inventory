require('./bootstrap');

import $ from "jquery";
import { split } from "lodash";

var productdata;
var branddata;
var clientdata;
var clientdata;
var checking;
var orderdata;
var linksdata = "";

$(function(){
    $.get("http://127.0.0.1:8000/product-list",{headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(e){
        $.each(e, function(_key, product){
            productdata += '<tr><td>'+product.product_name+'</td><td><div class="progress">';
            productdata += '<div class="progress-bar bg-success" role="progressbar" style="width: '+product.progression+'%" aria-valuenow="'+product.progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td>';
            productdata += '<td>'+product.brand_name+'</td><td>'+product.amount+'</td><td>'+product.updated_at+'</td></tr>';
        });
        if(productdata)
        $(".products").html(productdata);
        else
        $(".producttable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');
    }, "json");
});



    $(document).on("submit", "#brandForm", function(){
        var formData = new FormData(this);
        $.ajax({
            url: "http://127.0.0.1:8000/brand-list/store",
            type: "post",
            contentType: false,
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
            cache: false,
            processData:false,
            data: formData,
            beforeSend: function(){
                $("#brandForm").css("opacity", "0.5");
                $(document).find("span.error-text").text('');
                $(".save").prop("disabled", true);
            },
            success: function(e){
                if(e.status == 0)
                {
                    $("#brandForm").css("opacity", "");
                    $(".save").prop("disabled", false);
                    $.each(e.errors, function(key, val){
                        $("span."+key+"_error").text(val[0]);
                    })
                }
                else
                {
                    $("#brandForm").css("opacity", "");
                    $("#close").trigger("click");
                    $("#brandForm").trigger("reset");
                    $(".save").prop("disabled", false);
                    load_brands();
                }
              
            },
            error: function(e){
                $("#brandForm").css("opacity", "");
                $(".save").prop("disabled", false);
            }
        })
    })


$(function(){
    $.get("http://127.0.0.1:8000/client-list", {headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(e){
        $.each(e, function(_key, client){
            clientdata += '<tr><td>'+client.client_name+'</td>';
            clientdata += '><td>'+client.purchase_amount+'</td>';
            clientdata += '><td>'+client.updated_at+'</td></tr>';
        })
        if(clientdata)
        $(".clients").html(clientdata);
        else
        $(".clienttable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');
    })
});

$(function(){
    $.get("http://127.0.0.1:8000/order-list", {headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(e){
        $.each(e, function(_key, order){
            
            if(order.confirm != 0)
            {checking = 'checked';}
            else
            {checking = '';}
            

            orderdata += '<tr><td>'+order.client_name+'</td><td><div class="progress">';
            orderdata += '<div class="progress-bar bg-success" role="progressbar" style="width: '+order.sale_progression+'%" aria-valuenow="'+order.sale_progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td>';
            orderdata += '<td>'+order.product_name+'</td>';
            orderdata += '<td>'+order.brand_name+'</td>';
            orderdata += '<td>'+order.price+'</td>';
            orderdata += '<td>'+order.discount+'</td>';
            orderdata += '<td>'+order.amount+'</td>';
            orderdata += '<td><div class="custom-control custom-switch"><input type="checkbox" '+checking+' class="custom-control-input" id="'+order.id+'">';
            orderdata += '<label class="custom-control-label" for="'+order.id+'">';
            orderdata += '</label></div></td><td>'+order.updated_at+'</td></tr>';
        });
        if(orderdata)
        $('.orders').html(orderdata);
        else
        $('.ordertable').html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');
    });

});



$(function(){
    $("#photo").on("change", function() {
        var file = this.files[0];
        var fileType = file.type;
        var match = ['image/jpeg', 'image/png', 'image/jpg'];
        if(!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]) || (fileType == match[3]) || (fileType == match[4]) || (fileType == match[5]))){
            alert('Sorry, only JPG, JPEG, & PNG files are allowed to upload.');
            $("#image").val('');
            return false;
        }
        });
    
        function readURL(input, id) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    $('#' + id).attr('src', e.target.result);
                }
    
                reader.readAsDataURL(input.files[0]);
            }
        }
    
        $("#photo").on("change", function () {
            readURL(this, 'modal-preview');
        });
});

$(document).on("click", "#add", function(){
    $("#brandForm").trigger("reset");
    $("#modal-preview").attr('src', '');
    $(".save").html("Add");
    $('span').trigger('reset');
  });

  

$(function(){
    load_brands();
});

function load_brands(){
$.get("http://127.0.0.1:8000/brand-list",{headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(e){
    $.each(e.data, function(_key, brand){
        branddata += '<tr><td><img src="'+brand.brand_image+'" class="img-responsive"></td><td>'+brand.brand_name+'</td><td><div class="progress">';
        branddata += '<div class="progress-bar bg-success" role="progressbar" style="width: '+brand.progression+'%" aria-valuenow="'+brand.progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td>';
        branddata += '<td>'+brand.updated_at+'</td><td><a class="edit" data-id="'+brand.id+'" data-toggle="modal" data-target="#exampleModal"><i class="mdi mdi-table-edit h2 text-primary"></i></a><a class="delete" data-id="'+brand.id+'"><i class="mdi mdi-delete h2 ml-1 text-danger"></i></a></td></tr>';
    }); 
    linksdata += '<div class="col-md-12"> \
                  <nav aria-label="Page navigation example"> \
                  <ul class="pagination h4 mt-3 float-right">';
    $.each(e.links, function(_key, link){
        var active = link.active == true ? 'active' : '';
    linksdata += '<li class="page-item '+active+'"><a class="page-link" data-url="'+link.url+'" id="1" href="javascript:void(0)">'+link.label+'</a></li>';
    });
    linksdata += '</ul> \
                  </nav> \
                  </div>';
    if(branddata)
    {
        $(".brands").html(branddata);
        $(".pages").html(linksdata);
    } 
    else
    $(".brandtable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');
    branddata = "";
    linksdata = "";

    
}, "json");
};

$(function(){
    $(document).on('click', '.page-link', function(){
        var page = $(this).data("url").split('=');
        get_page(page[1]);
    })
});

function get_page(page)
{
    $.ajax({
        url: "http://127.0.0.1:8000/brand-list?page="+page,
        dataType: "json",
        success: function(e){
            $.each(e.data, function(_key, brand){
                branddata += '<tr><td><img src="'+brand.brand_image+'" class="img-responsive"></td><td>'+brand.brand_name+'</td><td><div class="progress"> \
                <div class="progress-bar bg-success" role="progressbar" style="width: '+brand.progression+'%" aria-valuenow="'+brand.progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td> \
                 <td>'+brand.updated_at+'</td><td><a class="edit" data-id="'+brand.id+'" data-toggle="modal" data-target="#exampleModal"> \
                 <i class="mdi mdi-table-edit h2 text-primary"></i></a><a class="delete" data-id="'+brand.id+'"><i class="mdi mdi-delete h2 ml-1 text-danger"></i></a></td></tr>';
            }); 
                linksdata += '<div class="col-md-12"> \
                            <nav aria-label="Page navigation example"> \
                            <ul class="pagination h4 mt-3 float-right">';
                $.each(e.links, function(_key, link){
                    var active = link.active == true ? 'active' : '';
                linksdata += '<li class="page-item '+active+'"><a class="page-link" data-url="'+link.url+'" id="1" href="javascript:void(0)">'+link.label+'</a></li>';
                });
                linksdata += '</ul> \
                            </nav> \
                            </div>';

                if(branddata)
                {
                    $(".brands").html(branddata);
                    $(".pages").html(linksdata);
                } 
                else
                $(".brandtable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');
                branddata = "";
                linksdata = "";
        }
    })
}


$(function(){
    $("body").on("click", ".edit", function(){
        var id = $(this).data("id");
        $.get("http://127.0.0.1:8000/brand-list/"+id,{headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(e){
            $('.error-text').html(' ');
            $("#name").val(e.brand_name);
            $("#modal-preview").attr("src", e.brand_image);
            $("#hidden_image").val(e.brand_image);
            $("#id").val(id);
        }, "json")
    });
}
);

$(function(){
    $(document).on("click", ".delete", function(){
        var id = $(this).data("id");
        if(confirm("Are you sure to remove this file?"))
        {
            $.get("http://127.0.0.1:8000/brand-list/delete/"+id, {headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')}}, function(){
                load_brands();
            })
        }
    })
});

$(function(){
    $(document).on('keyup', '#search', function(){
        var value = $(this).val();
        if($("#search").val() != '')
        load_search(value);
        else
        load_brands();
    })
})

function load_search(value){
    $.ajax({
        url: "/brand-list/search",
        type: "post",
        data: {value:value},
        headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
        success: function(e){
            $.each(e.data, function(_key, brand){
                branddata += '<tr><td><img src="'+brand.brand_image+'" class="img-responsive"></td><td>'+brand.brand_name+'</td><td><div class="progress"> \
                <div class="progress-bar bg-success" role="progressbar" style="width: '+brand.progression+'%" aria-valuenow="'+brand.progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td> \
                 <td>'+brand.updated_at+'</td><td><a class="edit" data-id="'+brand.id+'" data-toggle="modal" data-target="#exampleModal"> \
                 <i class="mdi mdi-table-edit h2 text-primary"></i></a><a class="delete" data-id="'+brand.id+'"><i class="mdi mdi-delete h2 ml-1 text-danger"></i></a></td></tr>';
            });
            linksdata += '<div class="col-md-12"> \
            <nav aria-label="Page navigation example"> \
            <ul class="pagination h4 mt-3 float-right">';
            $.each(e.links, function(_key, link){
            var active = link.active == true ? 'active' : '';
            linksdata += '<li class="page-item '+active+'"><a class="page-link" data-url="'+link.url+'" id="1" href="javascript:void(0)">'+link.label+'</a></li>';
            });
            linksdata += '</ul> \
                        </nav> \
                        </div>';
            if(e)
            {
                $(".brands").html(branddata);
                $(".pages").html(linksdata);
            } 
            else
            $(".brandtable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');

            branddata = "";
            linksdata = "";
        }
    })
}

$(function(){
    $(document).on('click', '.order', function(){
        var order  = $(this).data('order');
        var column = $(this).data('column');
        $.ajax({
            url: "/brand-list/order",
            type: "post",
            data: {order:order, column:column},
            headers: {'X-CSRF-Token': $("meta[name='csrf-token']").attr("content")},
            success: function(e){
                $.each(e.data, function(_key, brand){
                branddata += '<tr><td><img src="'+brand.brand_image+'" class="img-responsive"></td><td>'+brand.brand_name+'</td><td><div class="progress"> \
                <div class="progress-bar bg-success" role="progressbar" style="width: '+brand.progression+'%" aria-valuenow="'+brand.progression+'" aria-valuemin="0" aria-valuemax="100"></div></div></td> \
                 <td>'+brand.updated_at+'</td><td><a class="edit" data-id="'+brand.id+'" data-toggle="modal" data-target="#exampleModal"> \
                 <i class="mdi mdi-table-edit h2 text-primary"></i></a><a class="delete" data-id="'+brand.id+'"><i class="mdi mdi-delete h2 ml-1 text-danger"></i></a></td></tr>';
            });
            linksdata += '<div class="col-md-12"> \
            <nav aria-label="Page navigation example"> \
            <ul class="pagination h4 mt-3 float-right">';
            $.each(e.links, function(_key, link){
            var active = link.active == true ? 'active' : '';
            linksdata += '<li class="page-item '+active+'"><a class="page-link" data-url="'+link.url+'" id="1" href="javascript:void(0)">'+link.label+'</a></li>';
            });
            linksdata += '</ul> \
                        </nav> \
                        </div>';
            if(e)
            {
                $(".brands").html(branddata);
                $(".pages").html(linksdata);
            } 
            else
            $(".brandtable").html('<tr><td valign="top" colspan="1"><h3><b>No data available in table</b></h3></td></tr>');

            branddata = "";
            linksdata = "";
            }
        })
    })
})



