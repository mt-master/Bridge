/*
*date:2016-2-22
*/
var myScroll,
   pullDownEl, pullDownOffset,
   pullUpEl, pullUpOffset,
   generatedCount = 0;

function pullDownAction () {
   setTimeout(function () {   // <-- Simulate network congestion, remove setTimeout from production!
      var el, li, i;
      el = document.getElementById('thelist');

      for (i=0; i<3; i++) {
         li = document.createElement('li');
         li.className='list-group-item';
         li.innerText = 'Generated row ' + (++generatedCount);
         el.insertBefore(li, el.childNodes[0]);
      }
      
      myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
   }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
   setTimeout(function () {   // <-- Simulate network congestion, remove setTimeout from production!
      var el, li, i;
      el = document.getElementById('thelist');

      for (i=0; i<3; i++) {
         li = document.createElement('li');
         li.className='list-group-item';
         li.innerText = 'Generated row ' + (++generatedCount);
         el.appendChild(li, el.childNodes[0]);
      }
      
      myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
   }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

$(document).ready(function(){
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');   
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('test', {
      useTransition: true,
      topOffset: pullDownOffset,
      onRefresh: function () {
         if (pullDownEl.className.match('loading')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
         } else if (pullUpEl.className.match('loading')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
         }
      },
      onScrollMove: function () {
         if (this.y > 5 && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
            this.minScrollY = 0;
         } else if (this.y < 5 && pullDownEl.className.match('flip')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
            this.minScrollY = -pullDownOffset;
         } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
            pullUpEl.className = 'flip';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
            this.maxScrollY = this.maxScrollY;
         } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            this.maxScrollY = pullUpOffset;
         }
      },
      onScrollEnd: function () {
         if (pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';          
            pullDownAction(); // Execute custom function (ajax call?)
         } else if (pullUpEl.className.match('flip')) {
            pullUpEl.className = 'loading';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';           
            pullUpAction();   // Execute custom function (ajax call?)
         }
      }
   });
	setTimeout(function () { document.getElementById('test').style.left = '0'; }, 800);
});
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);