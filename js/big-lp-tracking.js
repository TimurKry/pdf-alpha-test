(function ($, Drupal, drupalSettings) {
  var trk = {};

  // trk.settings = drupalSettings.trk;
  $.fn.trk = trk;
  drupalSettings.trk = trk;

  // Add settings from backend
  trk.settings = drupalSettings.tracking;

  // Set language from backend
  trk.settings.lang = drupalSettings.path.currentLanguage;

  if (window.location.hostname == 'vorteile.big-direkt.de') {
    trk.settings.env = 'prod';
  } else {
    trk.settings.env = 'test';
    $('body').addClass('debug');
  }

  console.log(trk.settings.env, window.location.hostname);

  window.delaySeconds = 1500;

  // Default event for page views
  trk.model = {
    pageView: {
      'env_work': trk.settings.env,
      'env_platform': trk.settings.env_platform,
      'env_type': 'web',
      'service_ID': trk.settings.service_id,
      'seitenname': '',
      'page_type': '',
      'page_identificator': '',
      'page_language': trk.settings.lang,
      'page_source_modul': '',
      // 'page_cat1': '',
      // 'page_cat2': '',
      // 'page_cat3': '',
      // 'page_cat4': '',
      'page_config_categorie': ''
    },
    click: {
      'event': 'navigation',
      'eventCategory': 'Navigation',
      'eventAction': '', 
      'eventLabel': '', 
      'targetUrl': '', 
      'moduleName': '', 
      'triggerElement': 'a',
      'interactionType': ''
    },
  };

  // window.logging = true;

  // THE EVENT PUSHER
  trk.push = function (event) {
    if (trk.settings.env == 'test') {
      console.table(event);
      console.log(dataLayer);
    } 
 
    window.dataLayer.push(event);
  }

  trk.view = function (current, event_data) {
    if (trk.settings.urls.hasOwnProperty(current)) {
      
      build_event = Object.assign({}, this.model.pageView, trk.settings.urls[current], event_data);
      var page_source_modul = localStorage.getItem("pageSource");

      if (page_source_modul) {
        // console.log("Has a page source: " +  page_source_modul);
        build_event.page_source_modul = page_source_modul;
        localStorage.removeItem("pageSource");
      }
      // Alter event 
      $(document).trigger('trk-build-view-event', [build_event]);
      this.push(build_event);
    }
  }

  trk.click = function (event_data) {
    let build_event = Object.assign({}, this.model.click, event_data);
    this.push(build_event);
  }

  trk.elemClick = function ($elem, event_data) {

    // ToDo: Add a foreach?
    if ($elem.attr('data-tracking-event')) {
      event_data.event = $elem.attr('data-tracking-event');
    }
    
    if ($elem.attr('data-tracking-eventaction')) {
      event_data.eventAction = $elem.attr('data-tracking-eventaction');
    }

    if ($elem.attr('data-tracking-eventlabel')) {
      event_data.eventLabel = $elem.attr('data-tracking-eventlabel');
    }
    if ($elem.attr('data-tracking-eventcategory')) {
      event_data.eventCategory = $elem.attr('data-tracking-eventcategory');
    }
    
    if ($elem.attr('data-tracking-triggerelement')) {
      event_data.triggerElement = $elem.attr('data-tracking-triggerelement');
    }
    
    if ($elem.attr('data-tracking-eventdetail')) {
      event_data.eventDetail = $elem.attr('data-tracking-eventdetail');
    }
    
    if ($elem.attr('data-tracking-eventdetail')) {
      event_data.eventDetail = $elem.attr('data-tracking-eventdetail');
    }
    
    event_data.moduleName = $elem.closest('[data-tracking-eventModule]').attr('data-tracking-eventModule') ?? '';

    // ToDo: need fallback value?
    event_data.eventLabel = event_data.eventLabel ?? '';

    if (event_data.eventLabel.length > 50) {
      event_data.eventLabel = event_data.eventLabel.substr(0, 50) + ' ...';
    } 

    if (event_data.eventAction == 'internal_link') {
      let source = event_data.moduleName + ':' + event_data.triggerElement + ':' + event_data.eventLabel.replace(' ', '_');
      localStorage.setItem("pageSource", source);
    }

    trk.click(event_data);
  }

  trk.trackVisibleElements = function (context) {

    $(window).scroll(function(event) {

      var middle_of_screen = $(window).scrollTop() + $(window).innerHeight() / 2;
      // var scroll_of_screen = $(window).scrollTop();

      $('[data-tracking-visible]').each(function() {
        elem = $(this);
 
        elem.top_of_element = elem.offset().top;
        elem.bottom_of_element = elem.offset().top + elem.outerHeight();
        elem.target_id = elem.attr('data-tracking-target-id');
        // var delayTimer = null;

        // event.preventDefault()
        // trk.trackVisibleElements(context);

        // console.log(elem);
        // var scr = document.body.scrollTop;


        if ((middle_of_screen < elem.top_of_element) || (middle_of_screen > elem.bottom_of_element)) {
          if ( this.delayTimer ) {
            clearTimeout(this.delayTimer);
            this.delayTimer = false;
          }

          if (elem.hasClass('visible')) {
            elem.removeClass('visible');
            elem.removeClass('tracked');
          }

          if(window.location.hash.indexOf(elem.target_id) === 0){
            // window.location.href = window.location.href.split('#')[0];
            // history.back();
            // history.replaceState(null, null, ' ');
            // // history.back();
            // window.location.hash = '';
          }
          // if(window.location.hash === target_id + "-confirmation"){
          //   // window.location.href = window.location.href.split('#')[0];
          //   // history.back();
          //   history.replaceState(null, null, ' ');
          // }
        }

        if ((middle_of_screen > elem.top_of_element) && (middle_of_screen < elem.bottom_of_element)) {

          if (!elem.hasClass('visible') && !this.delayTimer) {
            elem.addClass('visible');
            let timerElem = elem;

            // clearTimeout(elem.delayTimer);
            this.delayTimer = setTimeout(function(){ 
              // document.body.scrollTop = scr;
              // history.replaceState(null, null, ' ');
              // history.replaceState(null, null, ' ');
              // window.location.hash = target_id;
              // window.scroll  (0, scroll_of_screen);
              // document.body.scrollTop = scr;
              // $('html, body').animate({
              //   scrollTop: top_of_element
              // }, 200);

              let event_data = {
                'event': "virtual_pw"
              };
    
              // // Get form id
              // let webform = elem.find('form');
              // if (webform.length) event_data.form_id = webform.find('[name="form_build_id"]').attr('value');
    
              let last_page_cat = 1;
              location.pathname.split('/').filter(path => path.length > 0).forEach(function(path, index){
                  event_data["page_cat" + (index + 1)] = path;
                  last_page_cat = (index + 2);
              });
    
              if (trk.settings.urls.hasOwnProperty(timerElem.target_id)) {
                event_data["page_cat" + last_page_cat] = trk.settings.urls[timerElem.target_id].seitenname;
              }
              trk.view(timerElem.target_id, event_data);
              timerElem.addClass('tracked');
            }, window.delaySeconds);
          };
        };
      });
    }); 
  }

  // trk.stepLoaded = function (stepName) {
  //   console.log('stepLoaded ' + stepName);
  // }

  

  Drupal.behaviors.trackingViews = {
    attach: function (context, settings) {
      const config = settings.tracking;

      // Track the view for this path...
      // ToDO: check for external internal....
      $('body').each(function(index, elem) {
        const $elem = $(elem)
        if (!$elem.hasClass('tracked')) {
          $elem.addClass('tracked')
          trk.view(location.pathname);
        }
      });

      $('[data-toggle="modal"]').each(function( index, elem ) {
        var target_id = $( this ).attr('data-target');
        const $elem = $(elem)
        $(target_id).on('shown.bs.modal', function () { 
          history.replaceState(null, null, target_id);

          let event_data = {
            'event': "virtual_pw"
          };

          // Get form id
          let webform = $(this).find('form');
          if (webform.length) event_data.form_id = webform.find('[name="form_build_id"]').attr('value');

          let last_page_cat = 1;
          location.pathname.split('/').filter(path => path.length > 0).forEach(function(path, index){
              event_data["page_cat" + (index + 1)] = path;
              last_page_cat = (index + 2);
          });

          if (config.urls.hasOwnProperty(target_id)) {
            event_data["page_cat" + last_page_cat] = config.urls[target_id].seitenname;
          }
          if (!webform.hasClass('tracked')) {
            trk.view(target_id, event_data);
            webform.addClass('tracked')     
          }

        })

        $(target_id).on('hidden.bs.modal', function () {
          history.replaceState(null, null, ' ');

          let event_data = {
            'page_source_modul': 'Overlay schließen | ' + target_id,
            'event': "virtual_pw"
          };

          // Get form id
          let webform = $(this).find('.webform');
          if (webform.length) event_data.form_id = webform.find('[name="form_build_id"]').attr('value');

          if (!$elem.hasClass('tracked-hide-modal')) {
            trk.view(location.pathname, event_data);
            $elem.addClass('tracked-hide-modal')     
          }
        })   
      });
    }
  };

  Drupal.behaviors.trackingOverrides = {
    attach: function (context, settings) {
      const config = settings.tracking;

      for (var selector in config.selectors) {
        let data = config.selectors[selector];
        let elem = $(selector);

        // Track klick even is not an "<a>"
        elem.attr('data-tracking', 'TRUE');

        for (var key in data) {
          elem.attr('data-tracking-' + key, data[key]);
        }
      }
    }
  };

  function trackingKlick(context, settings) {
    const config = settings.tracking;
    // console.log('trackingKlick');

    $('a, [data-tracking]', context).on('click touchstart', function (e) { 
      if (window.logging == true) {
        e.preventDefault();
      }

      let $elem = $(this);

      event_data = {};

      // ToDo add "touch"
      event_data.interactionType = 'click';

      // No text in the Link
      if ($elem.text().trim().length == 0) {

        // Check for image
        if ($elem.find('img').length) {
          let $img = $elem.find('img');
          event_data.triggerElement = $img.attr('src').endsWith('.svg') ? 'image-icon' : 'image';
          event_data.eventLabel = $img.attr('alt');
        } 

      }

      // Element has text
      else {

        event_data.eventLabel = $elem.text().trim();

        // Check element has an h1,h2,... 
        if ($elem.children(":header").length || $elem.parent(":header").length) {
          event_data.triggerElement = 'text-headline';
        } 

        // Check for list element
        else if ( $elem.parent("li").length ) {
          event_data.triggerElement = 'text-menu-link';
        } 

        // Simple text / text-long
        else {
          event_data.triggerElement = event_data.eventLabel.length < 40 ? 'text' : 'text-long';
        }
      }

      // ToDo: Modify the url for futher testing
      let href = $elem.attr('href') ?? '';
      href = href.toLowerCase();

      event_data.eventDetail = href.split('/').pop();

      event_data.targetUrl = href;

      // ToDo: add a url formatter first > always full url | < it is better for futher if/else
      if (href.indexOf(location.hostname) >= 0) {
        event_data.eventAction = 'internal_link';
      }
      else if (href.startsWith('tel:')) {
        event_data.eventAction = 'telephone_call';
        event_data.eventCategory = "Action";
        event_data.event = "action";
        event_data.eventDetail = href.replace("tel:", "")
        href = href.replace("tel:", "");
      }           
      else if (href.startsWith('mailto:')) {
        event_data.eventAction = 'send_mail';
        event_data.eventCategory = "Action";
        event_data.event = "action";
        event_data.eventDetail = href.replace("mailto:", "")
        href = href.replace("mailto:", "");
      }        
      else if (href.startsWith('/')) {
        event_data.eventAction = 'internal_link';
        href = location.origin + href;
      }
      else if (href.startsWith('#')) {
        event_data.eventAction = 'internal_link';
        event_data.eventDetail = ''; 
        event_data.targetUrl = href.replace("#", "");
        // e.preventDefault();
      }        
      else {
        event_data.eventAction = 'external_link';
      }

      trk.elemClick($elem, event_data);
    });
  }

  Drupal.behaviors.trackingKlick = {
    attach: function (context, settings) {
      trackingKlick(context, settings);
    }
  };

  Drupal.behaviors.trackingForms = {
    attach: function (context, settings) {
      const config = settings.tracking;

      // Set listner to have all errors
      var validateErrors = [];
      $(document).on('validate-errors', function( event, errorMap) {
        validateErrors = errorMap;
      })

      // Is it an confirmation page?
      if ($(".webform-confirmation", context).length) {

        let $webform =  $(".webform-confirmation", context).parents('.webform');
        let target_id = "#" + $webform.parents('.modal').attr('id') + "-confirmation";
        window.location.hash = target_id;

        let event_data = {
          event: "virtual_pw",
          // form_id: $webform.find('[name="form_build_id"]').attr('value')
        };

        trk.view(target_id, event_data);
        return;
      }

      // Is it an confirmation page?
      if ($(".success-message", context).length) {
        let target_id = false;

        if($(".success-message", context).parents('.modal').attr('id')){
          target_id = "#" + $(".success-message", context).parents('.modal').attr('id') + "-confirmation";
        }

        // if($(context).attr('data-tracking-target-id')){
        if ($("[data-tracking-target-id", context).length) {
          target_id = $("[data-tracking-target-id", context).attr('data-tracking-target-id');
        }

        window.location.hash = target_id;

        let event_data = {
          event: "virtual_pw",
          // form_id: $webform.find('[name="form_build_id"]').attr('value')
        };

        trk.view(target_id, event_data);
        return;
      }
    
      // We have a form?
      let $webform = $(".webform", context);
      if (!$webform.length) return;

      let event_data = {
        form_id: $webform.find('[name="form_build_id"]').attr('value')
      };

      $webform.find('[type="submit"]').on('click touchstart', function (e) { 
        $elem = $(this);

        if ( Object.keys(validateErrors).length ) {
          let errors = [];
          $.each(validateErrors, function(key, error) {
            errors.push(key);
          });
          event_data.eventDetail = "Failed: " + errors.join(', ');
        } else {
          event_data.eventDetail = "OK";
        }

        event_data.event = "form_events";
        event_data.eventAction = "form_submit";
        event_data.eventCategory = "Forms";
        event_data.eventLabel = $(this).attr('value');
        event_data.triggerElement = "Primär-Button";

        trk.elemClick($elem, event_data);

        if (window.logging == true) {
          e.preventDefault();
        }
      })
    }
  };
  
  Drupal.behaviors.ModalFormular = {
    attach: function (context, settings) {
      window.onhashchange = function() { 
        if (location.hash) {
          $(location.hash, context).modal('show');
        } else {
          $('.modal', context).modal('hide');
        }
      }
    }
  };

  Drupal.behaviors.FormFieldsDuration = {
    attach: function (context, settings) {
      const input = $('input', context) // select > onFocus to long
        .not(':input[type=button], :input[type=submit], :input[type=reset]')  
      const form = input.parents('form.big-form')
      const stepName = form.find('.form-title h3').text()

      input // form.find('input') // select > onFocus to long
        .on('focus', (e) => {
          const $elem = $(e.currentTarget);
          var milliseconds = new Date().getTime();
          $elem.data('focus', milliseconds)
        })
        .on('focusout', (e) => {
          const $elem = $(e.currentTarget);
          if (!$elem.data('focus')) {
            return;
          }

          const milliseconds = new Date().getTime();
          const diff = (milliseconds - $elem.data('focus')) / 1000
          $elem.data('focus', false)

          if (diff > 2) {
            trk.push({
              'event': 'form_events',
              'eventCategory': 'Forms',
              'eventAction': 'field_duration', 
              'eventLabel': Math.round(diff), 
              'fieldName': $elem.attr('name'), 
              'stepName': stepName, 
              'mandatoryField': $elem.attr('required'),
              'triggerElement': $elem[0].nodeName,
              'interactionType': 'onfocus'
            });
          }
        })
    }
  };

  Drupal.behaviors.FormFieldsChange = {
    attach: function (context, settings) {
      const input = $('input, select', context) // select > onFocus to long
      const form = input.parents('form.big-form')
      const stepName = form.find('.form-title h3').text()
      input // form.find('input') // select > onFocus to long
        .on('focus', (e) => {
          const $elem = $(e.currentTarget);
          const oldValue = $elem.val();
          $elem.data('oldValue', oldValue)
        })
        .on('focusout', (e) => {
          const $elem = $(e.currentTarget);
          if (!$elem.data('oldValue')) {
            return;
          }
          const newValue = $elem.val();
          const oldValue = $elem.data('oldValue')
          if (newValue != oldValue) {
            trk.push({
              'event': 'form_events',
              'eventCategory': 'Forms',
              'eventAction': 'fieled_change', 
              'eventLabel': 'changed', 
              'fieldName': $elem.attr('name'), 
              'stepName': stepName, 
              'mandatoryField': $elem.attr('required'),
              'triggerElement': $elem[0].nodeName,
              'interactionType': 'onchange'
            });
          }
        })
    }
  };

  Drupal.behaviors.SwitchStep = {
    attach: function (context) {
      const inputs = $('input, select', context)
      const form = inputs.parents('form.big-form')
      const stepName = form.find('.form-title h3').text()
      let fieldsWithError = []

      form
        .find('.form-actions')
        .find('input')          
        .on('mousedown', (e) => {
          const $elem = $(e.currentTarget);
          e.preventDefault();
          trk.lastButtonName = $elem.attr('data-step-direction')
          trk.lastButtonTarget = $elem.attr('data-step-target')
        }) 

      if (inputs.length > 0) {
        inputs.each(function( index ) {
          if ($(this).hasClass('error')) {
            fieldsWithError.push($(this).attr('name'))
          }
        });
      }

      if (trk.lastButtonName && trk.lastButtonTarget) {
        trk.push({
          'eventCategory': 'Forms',
          'eventAction': trk.lastButtonName,
          'eventLabel': fieldsWithError.length > 0 ? 'failed' : 'OK', 
          'fieldName': fieldsWithError.join(', '), 
          'targetStep': stepName, 
          'stepName': trk.lastButtonTarget, 
          'triggerElement': 'button',
          'interactionType': 'mouseclick'
        });
        trk.lastButtonName = false;
        trk.lastButtonTarget = false;
      }
    }
  };


  Drupal.behaviors.FormAbandonment = {
    attach: function (context, settings) {
      const input = $('input, select', context)
        .not(':input[type=button], :input[type=submit], :input[type=reset]')  
      const form = input.parents('form.big-form')
      const stepName = form.find('.form-title h3').text()

      input // form.find('input') // select > onFocus to long
        .on('focus', (e) => {
          const $elem = $(e.currentTarget);
          let elements = form.data('elements')
          if (elements) {
            elements = elements.split(';')
          } else {
            elements = []
          }
          elements.push($elem.attr('name')) 
          form.data('elements', elements.join(';'))
        })

      form
        .find('.form-actions')
        .find('input')          
        .on('mousedown', (e) => {
          let elements = form.data('elements')
          e.preventDefault();
          if (elements) {
            trk.push({
              'event': 'form_events',
              'eventCategory': 'Forms',
              'eventAction': 'form_abandonment', 
              'eventLabel': elements, 
              'stepName': stepName, 
              'targetStep': trk.lastButtonTarget, 
              'interactionType': 'mouseclick'
            });

            form.data('elements','')
          }
        }) 
    }
  };

  Drupal.behaviors.TrackVisibleElements = {
    attach: function (context) {
      trk.trackVisibleElements();
      $(window).scroll();
    }
  };

})(jQuery, Drupal, drupalSettings);
