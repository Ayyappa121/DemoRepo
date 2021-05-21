var _advancePlayerList;
var _advancePlayer;
var onBlinkFlag = true;


initAdvanceplayerLIst();

function initAdvanceplayerLIst()
{
	_advancePlayerList =  $('#advancePlayersInfo');

	setInterval(function(){	
      if(document.getElementsByClassName('chatMsgBlink'))
      {
      	for(var i = 0 ; i< document.getElementsByClassName('chatMsgBlink').length; i++)
      	{
      		if(onBlinkFlag)
      		{
      		  document.getElementsByClassName('chatMsgBlink')[i].style.display = 'block';
      		}
		    else
		    {
		      document.getElementsByClassName('chatMsgBlink')[i].style.display = 'none';
		    }
      	}
      	onBlinkFlag =  onBlinkFlag ? false : true;
      }

	}, 500);

	
}

function onAdvancePlayerSelected()
{
	  if(openTabsArray.length>=32 || playerSelectedInQueue || reconnecting)
	  {
	  	return;
	  }	
	  playerSelectedInQueue = true;
	  var memberId = this.getAttribute("MID");
	  selectedMember = getPlayerByMid(memberId);
      connection.send('<OPENTAB MID="'+memberId+'" AID="'+AID+'"/>');
	    if(advancePlayerList.indexOf(memberId)>=0)
		{
			advancePlayerList.splice(advancePlayerList.indexOf(memberId),1);
			this.remove();
			getPlayerByMid(memberId).haveMessage = 0;
		}
	  var item = document.getElementById("player_"+memberId);
	  item.getElementsByClassName('blinktimer')[0].style.display="none";
	  item.style.display = "none";
	  getplayerInfo(memberId);
	  showPlayerDetailsInfo(selectedMember);	
	  onSocketRecieveMsg();
	  selectedMember.blinktimer = null;
      selectedMember.timercount = null;
	  if(selectedMember){
	  document.getElementById('offset').style.display="block";
      document.getElementById('playertime').style.display="block";
	  }
      clearTimeout(selectedMember.blinktimer);
	  var t = setTimeout(getBalanceInfo, 5000);
	  offsetTimeForPlayer();

}

function addAdvancedPlayer(player){
	
	if(advancePlayerList.indexOf(player.memberId)<0)
	{
	     getplayerInfo(player.memberId);
		_advancePlayer = "<li id = advanceplayer_"+player.memberId+" MID="+player.memberId+" class=advancePlayerData><div class=chatMsg /><div class='chatMsgBlink' /><img class=adUserIcon src="+vipIconSrc(player)+" /><span class=a_nickname>"+player.nickName+"</span><span class=a_totaldeposit>"+player.totalDeposits+"</span><span class=a_totalbonus>"+player.totalBonus+"</span><span class=a_realbalance>"+player.realBalance+"</span><span  class=a_bonusbalance>"+player.bonusBalance+"</span><span class=a_firstdep>"+player.firstDeposit+"</span><span  class=a_lastdep>"+player.lastDeposit+"</span><span  class=a_pendingwithdrawals>"+player.pendingWithdrawal+"</span><span  class=a_favirotegame>"+player.favoriteGame+"</span><span  class=a_marginamount>"+player.magrinAmount+"</span></li> ";
	    _advancePlayerList = $('#advplist'+player.vip);
	    _advancePlayerList.append(_advancePlayer);
	     $('#advanceplayer_'+player.memberId).on('click', onAdvancePlayerSelected);
	    advancePlayerList.push(player.memberId);

	}

}



function setAdvanceplayerlistInfo(mid)
{
	     var _player = getPlayerByMid(mid);
	     //console.log(_player.nickName,mid)
	     var item = document.getElementById('advanceplayer_'+mid);
	     if(item)
	     {
	     	item.getElementsByClassName('a_totaldeposit')[0].innerHTML = _player.totalDeposits
	     	item.getElementsByClassName('a_totalbonus')[0].innerHTML = _player.totalBonus
	     	item.getElementsByClassName('a_realbalance')[0].innerHTML = _player.bonusBalance
	     	item.getElementsByClassName('a_firstdep')[0].innerHTML = _player.firstDeposit
	     	item.getElementsByClassName('a_lastdep')[0].innerHTML = _player.lastDeposit
	     	item.getElementsByClassName('a_pendingwithdrawals')[0].innerHTML = _player.pendingWithdrawal
	     	item.getElementsByClassName('a_favirotegame')[0].innerHTML = _player.favoriteGame
	     }

}



function checkChatingPlayers()
{
	for(var i=0;i<openTabsArray.length;i++)
	{
      if(playersInQueue.indexOf(openTabsArray[i])>=0)
      {
  		    var item = document.getElementById('advanceplayer_'+openTabsArray[i]);
			if(item)
			{
			  advancePlayerList.splice(advancePlayerList.indexOf(openTabsArray[i]),1);
			  item.remove();	
			}
      }
     
    }
}