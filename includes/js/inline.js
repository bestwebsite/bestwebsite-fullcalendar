var bestwebsite_loaded = false;
var bestwebsite_counts = {};
jQuery(document).ready( function($){	
	var fullcalendar_args = {
		timeFormat: WPFC.timeFormat,
		defaultView: WPFC.defaultView,
		weekends: WPFC.weekends,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: WPFC.header.right
		},
		month: WPFC.month,
		year: WPFC.year,
		theme: WPFC.bestwebsite_theme,
		firstDay: WPFC.firstDay,
		editable: false,
		eventSources: [{
				url : WPFC.ajaxurl,
				data : WPFC.data,
				ignoreTimezone: true,
				allDayDefault: false
		}],
	    eventRender: function(event, element) {
			if( event.post_id > 0 && WPFC.bestwebsite_qtips == 1 ){
				var event_data = { action : 'bestwebsite_qtip_content', post_id : event.post_id, event_id:event.event_id };
				element.qtip({
					content:{
						text : 'Loading...',
						ajax : {
							url : WPFC.ajaxurl,
							type : "POST",
							data : event_data
						}
					},
					position : {
						my: WPFC.bestwebsite_qtips_my,
						at: WPFC.bestwebsite_qtips_at
					},
					style : { classes:WPFC.bestwebsite_qtips_classes }
				});
			}
	    },
		loading: function(bool) {
			if (bool) {
				var position = $('#calendar-calendar').position();
				$('.calendar-loading').css('left',position.left).css('top',position.top).css('width',$('#calendar').width()).css('height',$('#calendar').height()).show();
			}else {
				bestwebsite_counts = {};
				$('.calendar-loading').hide();
			}
		},
		viewDisplay: function(view) {
			if( !bestwebsite_loaded ){
				$('.fc-header tbody').append('<tr><td id="calendar-filters"  colspan="3"></td></tr>');
				search_menu = $('#calendar-calendar-search').show();
				$('#calendar-filters').append(search_menu);
				//catchall selectmenu handle
			    $.widget( "custom.bestwebsite_selectmenu", $.ui.selectmenu, {
			        _renderItem: function( ul, item ) {
			        	var li = $( "<li>", { html: item.label.replace(/#([a-zA-Z0-9]{3}[a-zA-Z0-9]{3}?) - /g, '<span class="calendar-cat-icon" style="background-color:#$1"></span>') } );
			        	if ( item.disabled ) {
			        		li.addClass( "ui-state-disabled" );
			        	}
			        	return li.appendTo( ul );
			        }
			    });
				$('select.calendar-taxonomy').bestwebsite_selectmenu({
					format: function(text){
						//replace the color hexes with color boxes
						return text.replace(/#([a-zA-Z0-9]{3}[a-zA-Z0-9]{3}?) - /g, '<span class="calendar-cat-icon" style="background-color:#$1"></span>');
					},
					select: function( event, ui ){
						menu_name = $(this).attr('name');
						$( '#' + menu_name + '-button .ui-selectmenu-text' ).html( ui.item.label.replace(/#([a-zA-Z0-9]{3}[a-zA-Z0-9]{3}?) - /g, '<span class="calendar-cat-icon" style="background-color:#$1"></span>') );
						WPFC.data[menu_name] = ui.item.value;
						$('#calendar-calendar').fullCalendar('removeEventSource', WPFC.ajaxurl).fullCalendar('addEventSource', {url : WPFC.ajaxurl, allDayDefault:false, ignoreTimezone: true, data : WPFC.data});
					}
				})
			}
			bestwebsite_loaded = true;
	    }
	};
	if( WPFC.bestwebsite_locale ){
		$.extend(fullcalendar_args, WPFC.bestwebsite_locale);
	}
	$(document).trigger('bestwebsite_fullcalendar_args', [fullcalendar_args]);
	$('#calendar-calendar').fullCalendar(fullcalendar_args);
});
