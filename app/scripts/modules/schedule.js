'use strict';

var config = require('../config');
var utilities = require('../utilities');

function schedule() {
  var activeClass = 'conference__tab--active';
  var tableHidden = 'table-hidden';
  var timetable = 'timetable';
  var viewport;
  var menuHeight;
  var list = document.querySelector('.conference > ul');
  var tabs = list.childNodes;
  var activeTab = list.querySelector('.' + activeClass);
  var conf = list.parentNode;
  var listHeight = list.offsetHeight;
  var tables = conf.getElementsByClassName(timetable);

  (function() {
    var reports = document.getElementsByClassName('session--report');

    Array.prototype.forEach.call(tabs, function(tab) {
      tab.onclick = function() {
        changeTab(tab);
      };
    });

    Array.prototype.forEach.call(reports, function(report) {
      var header = report.getElementsByClassName('session__name')[0];
      var icon = report.getElementsByClassName('session__icons')[0];
      icon.addEventListener('click', function() {
        toggleAbout(header)
      });
      header.addEventListener('click', function() {
        toggleAbout(header)
      });
    });
  })();

  window.onresize = fixTabsOrNot;

  fixTabsOrNot();

  function fixTabsOrNot() {
    viewport = window.innerWidth;

    if (viewport <= config.breakPoint) {
      //fix tabs on scroll for small devices
      window.addEventListener('scroll', fixTabs);
      fixTabs();
      Array.prototype.forEach.call(tables, function(item, i) {
        item.classList.remove(tableHidden);
      });
    } else {
      //show proper tab
      activeTab.onclick();
      resetList();
    }

  }

  function changeTab(el) {
    viewport = window.innerWidth;
    menuHeight = document.getElementById('menu').offsetHeight;
    //make li active if it is not
    if (viewport > config.breakPoint) {
      el.classList.add(activeClass);
    }
    //find index of active tab and show appropriate table
    Array.prototype.forEach.call(tabs, function(item, i) {

      if (viewport > config.breakPoint) {
        tables[i].classList.add(tableHidden);
      }
      //remove active class is item was active before click
      if (item !== el) {
        item.classList.remove(activeClass);
      }
      //show table with the same index as active tab
      if (item == el) {
        if (viewport > config.breakPoint) {
          tables[i].classList.remove(tableHidden);
        } else {
          var targetScroll = tables[i].offsetTop - menuHeight - list.offsetHeight;

          utilities.scrollTo(targetScroll, 300);
        }
      }
    });
  }

  function toggleAbout(el) {
    var session = el.parentNode.parentNode;
    var about = session.getElementsByClassName('session__about')[0];
    var icons = session.getElementsByClassName('session__icon');
    var sessionTime = session.getElementsByClassName('session__time')[0];

    Array.prototype.forEach.call(icons, function(icon, idx, arr) {
      if (typeof icon.classList !== 'undefined') {
        icon.classList.toggle('invisible');
      } else {
        //IE does not support classList for SVG elements
        var svgClassName = icon.getAttribute('class');
        if (svgClassName.indexOf('invisible') == -1) {
          icon.setAttribute('class', svgClassName += ' invisible');
        } else {
          icon.setAttribute('class', svgClassName.replace(' invisible', ''));
        }
      }
    });
    about.classList.toggle('invisible');
    sessionTime.classList.toggle('session__time--about-expanded');
  }

  function fixTabs() {
    var bodyScrlPos = document.body.scrollTop || document.documentElement.scrollTop;
    var schedule = conf.parentNode;
    var scheduleHeight = schedule.offsetHeight;
    var scheduleTop = schedule.offsetTop;
    var scheduleBottom = scheduleHeight + scheduleTop;
    var confTopPos = conf.offsetTop;
    var confHeight = conf.offsetHeight;
    var confBottom = confTopPos + confHeight;

    viewport = window.innerWidth;
    menuHeight = document.getElementById('menu').offsetHeight;

    var tablesTopPoss = Array.prototype.map.call(tables, function(table) {
      return table.offsetTop;
    });
    tablesTopPoss.push(scheduleBottom);

    if (viewport <= config.breakPoint) {
      if (bodyScrlPos >= confTopPos - menuHeight) {
        if (bodyScrlPos <= (scheduleBottom - menuHeight)) {

          //this chunk is for fixing tabs on scroll
          conf.style.paddingTop = listHeight + 'px';
          list.classList.add('list-fixed');
          list.style.top = menuHeight + 'px';

          //make tabs "stick" to confBottom
          if (bodyScrlPos > (scheduleBottom - listHeight - menuHeight)) {
            list.style.top = scheduleBottom - bodyScrlPos - listHeight + 'px';
          }
          //remove active tab classname
          Array.prototype.forEach.call(tablesTopPoss, function(tablTop, i) {
            var nextItem = tablesTopPoss[i + 1]
            if ((bodyScrlPos >= tablTop - menuHeight - listHeight) &&
            (bodyScrlPos < nextItem - menuHeight - listHeight)) {
              list.childNodes[i].classList.add(activeClass);
            } else {
              //condition to prevent Type Error
              if (typeof list.childNodes[i] !== 'undefined') {
                list.childNodes[i].classList.remove(activeClass);
              }
            }
          });
        } else {
          resetList();
        }
      } else {
        resetList();
      }
    }
  }

  function resetList() {
    conf.style.paddingTop = '0px';
    list.classList.remove('list-fixed');
  }
}

module.exports = schedule;
