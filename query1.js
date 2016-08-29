$(document).ready(function () {
    var wh = $(window).height();
    var ww = $(window).width();
    console.log(wh, ww);
    $('.wrap').css({
        "height": wh + 'px'
    });
    $('.wrap').css({
        "width": ww + 'px'
    });
    $('body').css({
        "background": 'url' + '(123.jpg)'
    });
    $(window).resize(function () {
        var wh = $(window).height();
        var ww = $(window).width();
        $('.wrap').css({
            "height": wh + 'px'
        });
        $('.wrap').css({
            "width": ww + 'px'
        });
        $('.wrap').css({
            "background": 'url' + '(123.jpg)'
        });
        
    });

        $("#count").text("게임을 시작할려면 시작 버튼을 눌러주세요.");
       
        
        $("#play").on("click",function(){
            
            
            $(".ans").attr("readonly",false).attr("disabled",false);  
            $("#play").val("재시작");
            $("#count").text("기회 6번 남았습니다.");
            $("#information").text("숫자를 입력해주세요.");
            $(".ans").val("");
            
            var computer = [];
            var answer = [];
            var game=3;
                
             for (var i = 0; i < 3; i++) {
            computer[i] = Math.floor(Math.random() * 10);
            for (var j = 0; j < i; j++) {
                if (computer[i] == computer[j]) {
                    computer[i] = Math.floor(Math.random() * 10);
                    i--;
                }
            }
        }
            for(var i=0; i<computer.length; i++){
            console.log(computer[i]);
            }
            
             $('#click').unbind("click").bind("click", function (){
               
                var one = $('#one').val();
                var two = $('#two').val();
                var three = $('#three').val();
                
                if(one==two&&two==three&&three==one){
                    $("#information").prepend("빈칸 혹은 문자 혹은 같은숫자를 입력했음<br>");
                     $(".ans").val("");
                }
            
                else if(one==""&&two==""&&three==""){
                    $("#information").prepend("빈칸 혹은 문자 혹은 같은숫자를 입력했음<br>");
                }
                else if($.isNumeric(one,two,three)==false){
                    $("#information").prepend("빈칸 혹은 문자 혹은 같은숫자를 입력했음<br>");  
                }
                else {
                    
                      
                    var strike=0;
                    var ball=0;
                    var out=0;
                    
                    answer[0] = one;
                    answer[1] = two;
                    answer[2] = three;
                    
                    for(var i=0; i<3; i++) {
                        if(computer[i]==answer[i]) {
                            strike++;
                         
                        }
                        else if(computer[i]!=answer[i]){
                            for(var j=0; j<answer.length;j++) {
                                if(computer[i]==answer[j]) {
                                    ball++;
                                
                                }
                            }
                        }
                    }
                    out=3-(strike+ball);
                     $("#information").prepend(strike+"스트라이크"+ball+"볼"+out+"아웃 입니다.<br>");
                     game--;
                    if(strike!=3&&game==0){
                         $("#information").prepend("졌습니다.<br>");
                        $(".ans").attr("readonly",true).attr("disabled",false); 
                        $("#click").off("click");
                        
                    }
                    if(game!=0&&strike==3) {
                        $("#information").prepend("승리하셨습니다.<br>");
                        $(".ans").attr("readonly",true).attr("disabled",false);
                        $("#click").off("click");
                    }
                }
               
            });
             
        
        });
});
