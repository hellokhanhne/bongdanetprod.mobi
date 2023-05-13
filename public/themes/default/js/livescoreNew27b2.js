var LiverscoreNew={goalPopupContent:'',goalRedContent:'',audioGoal:null,audioRed:null,liveInterval:null,showpoupGoal:true,runAudio:true,setRunAudio:function(value){localStorage.setItem('livescore_run_audio',value);},checkRunAudio:function(){if(localStorage.getItem('livescore_run_audio')=='0'){return false;}
return true;},setLivescore:function(){this.setLivescoreByTime();this.runLivescore();},setLivescoreOption:function(showpoupGoal){this.setLivescoreByTime();this.runLivescore();this.showpoupGoal=showpoupGoal;},loadView:function(url,selector,elementClick){$(selector).html('<p class="text-center pad10"><img src="/themes/default/images/loading.gif" /></p>');$.get(url,function(res){$(selector).html(res);});},reloadLive:function(){if(this.liveInterval!==null){clearInterval(this.liveInterval);}
this.setLivescore();},setLivescoreByTime:function(){this.audioGoal=new Audio('/themes/default/media/sound1.mp3');this.audioRed=new Audio('/themes/default/media/red.mp3');var that=this;this.liveInterval=setInterval(function(){that.runLivescore();},25000);},runLivescore:function(){this.goalPopupContent='';this.rePopupContent='';var that=this;$.get('/files/tiktok2.txt',function(response){if(response){var totalEle=response.length;for(var i=0;i<totalEle;i++){that.applyChangeScore(response[i]);}
if(that.goalPopupContent.length>0){$('#popLayer').show();$('#popLayer #ppDiv').html(that.goalPopupContent);setTimeout(function(){$('#popLayer #ppDiv').html('');$('#popLayer').hide();},10000);if(that.checkRunAudio()){that.audioGoal.play();}}
setTimeout(function(){$('.guestS').removeClass('on');$('.homeS').removeClass('on');$('.team .name').removeClass('ballIn');$('.team').removeClass('ballIn');$('.hOdds span').removeClass('o-down');$('.hOdds span').removeClass('o-up');},30000);}},'json');},applyChangeScore:function(oneChange){var elements=oneChange.split(",");var divID=elements[0];var isChangeHomeScore=false;var isChangeAwayScore=false;var countHomeScore=0;if($('#tb_'+divID).length){var statusCurrent=$('#state_'+divID).text();if(elements[1]==='FT'&&$('#tb_'+divID).hasClass('item-ft'))return '';if(!$('#tb_'+divID).hasClass('item-tructiep')){$('#tb_'+divID).addClass('item-tructiep');}
if(!$('#state_'+divID).hasClass('show-minute')){$('#state_'+divID).addClass('show-minute');}
if(elements[1]==='FT'&&!$('#tb_'+divID).hasClass('item-ft')){$('#tb_'+divID).addClass('item-ft');}
if(!isNaN(elements[1])||elements[1].indexOf('45+')!=-1||elements[1].indexOf('90+')!=-1){this.changeOneScoreCell('#state_'+divID,elements[1]+'<img src="/themes/mobile/images/in_red.gif">','');}else if(elements[1]=='FT'){$('#state_'+divID).text(elements[29]);$('#tb_'+divID+' .status').text(elements[1]);$('#state_'+divID).removeClass('show-minute');}else{this.changeOneScoreCell('#state_'+divID,elements[1],'');}
$('#hsc_vs_gsc_'+divID).text('-');$('#tb_'+divID+' .wr-info-tiso').show();if($('#tb_'+divID+' .wr-info-new').length>0){$('#tb_'+divID+' .wr-info-new').remove();}
if(elements[2]!=$('#hsc_'+divID).text()){this.changeOneScoreCell('#hsc_'+divID,elements[2],'on');$('#ht_'+divID).parent().parent().addClass('ballIn');if(elements[2]!=0){isChangeHomeScore=true;}}
if(elements[3]!=$('#gsc_'+divID).text()){this.changeOneScoreCell('#gsc_'+divID,elements[3],'on');$('#gt_'+divID).parent().parent().addClass('ballIn');if(elements[3]!=0){isChangeAwayScore=true;}}
if((isChangeHomeScore||isChangeAwayScore)&&countHomeScore<5&&this.showpoupGoal){this.goalPopupContent+='<div class="ballInBox">\n'+
'                                <div class="timeBox">'+$('#state_'+divID).html()+'</div>\n'+
'                                <div class="teamBox">\n'+
'                                    <div class="team home">\n'+
'                                        <div class="name">'+$('#ht_'+divID).text()+'</div>\n'+
'                                        <span class="'+(isChangeHomeScore?'red':'')+'">'+$('#hsc_'+divID).text()+'</span>\n'+
'                                    </div>\n'+
'                                    <div class="team guest">\n'+
'                                        <div class="name">'+$('#gt_'+divID).text()+'</div>\n'+
'                                        <span class="'+(isChangeAwayScore?'red':'')+'">'+$('#gsc_'+divID).text()+'</span>\n'+
'                                    </div>\n'+
'                                </div>\n'+
'                            </div>';}
this.changeOneScoreCell('#htit_'+divID,elements[4],'');this.changeOneScoreCell('#hht_'+divID,elements[5],'');this.changeOneScoreCell('#ght_'+divID,elements[6],'');if(elements[7]>0){this.changeOneScoreCell('#hR_'+divID,'<i>'+elements[7]+'</i>','');}else{this.changeOneScoreCell('#hR_'+divID,'','');}
if(elements[8]>0){this.changeOneScoreCell('#hY_'+divID,'<i>'+elements[8]+'</i>','');}else{this.changeOneScoreCell('#hY_'+divID,'','');}
if(elements[9]>0){this.changeOneScoreCell('#gR_'+divID,'<i>'+elements[9]+'</i>','');}else{this.changeOneScoreCell('#gR_'+divID,'','');}
if(elements[10]>0){this.changeOneScoreCell('#gY_'+divID,'<i>'+elements[10]+'</i>','');}else{this.changeOneScoreCell('#gY_'+divID,'','');}
this.changeOneScoreCell('#corner_'+divID+' span',elements[11],'');if($('#o2_'+divID).text()>elements[12]){this.changeOneScoreCell('#o2_'+divID,elements[18],'o-up');}else{this.changeOneScoreCell('#o2_'+divID,elements[18],'o-down');}
if($('#o3_'+divID).data('odd')>elements[12]){this.changeOneScoreCell('#o3_'+divID,elements[14],'o-up');}else{this.changeOneScoreCell('#o3_'+divID,elements[14],'o-down');}
if($('#o4_'+divID).text()>elements[16]){this.changeOneScoreCell('#o4_'+divID,elements[16],'o-up');}else{this.changeOneScoreCell('#o4_'+divID,elements[16],'o-down');}
if($('#o5_'+divID).data('odd')>elements[15]){this.changeOneScoreCell('#o5_'+divID,elements[19],'o-up');}else{this.changeOneScoreCell('#o5_'+divID,elements[19],'o-down');}
if($('#o6_'+divID).text()>elements[17]){this.changeOneScoreCell('#o6_'+divID,elements[17],'o-up');}else{this.changeOneScoreCell('#o6_'+divID,elements[17],'o-down');}
if(elements[1]=='FT'&&elements[1]!=statusCurrent&&$('#lv2_title_results').length>0){var htmlClone=$('#tb_'+divID).clone();$('#tb_'+divID).remove();$('#lv2_title_results').after(htmlClone);$('#tb_'+divID).attr('data-index','');}}},changeOneScoreCell:function(selector,newVal,changeClass){var currentVal=$(selector).html();$(selector).html(newVal);if(currentVal!=newVal&&changeClass.length>0){$(selector).addClass(changeClass);}}};