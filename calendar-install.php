<?php
//if called, assume we're installing/updated
add_option('bestwebsite_theme', get_option('dbem_emfc_theme',1));
add_option('bestwebsite_theme_css', 'ui-lightness');
add_option('bestwebsite_limit', get_option('dbem_emfc_events_limit',3));
add_option('bestwebsite_limit_txt', get_option('dbem_emfc_events_limit_txt','more ...'));
add_option('bestwebsite_qtips', get_option('dbem_emfc_qtips',true));
add_option('bestwebsite_qtips_style', get_option('dbem_emfc_qtips_style','light'));
add_option('bestwebsite_qtips_my', get_option('dbem_emfc_qtips_my','top center'));
add_option('bestwebsite_qtips_at', get_option('dbem_emfc_qtips_at','bottom center'));
add_option('bestwebsite_qtips_rounded', get_option('dbem_emfc_qtips_rounded', false));
add_option('bestwebsite_qtips_image',1);
add_option('bestwebsite_qtips_image_w',75);
add_option('bestwebsite_qtips_image_h',75);
add_option('bestwebsite_timeFormat', 'h(:mm)t');
add_option('bestwebsite_defaultView', 'month');
add_option('bestwebsite_available_views', array('month','basicWeek','basicDay'));

//make a change to the theme
if( version_compare( get_option('bestwebsite_version'), '1.0.2') ){
    $bestwebsite_theme_css = get_option('bestwebsite_theme_css');
    //replace CSS theme value for new method
    $bestwebsite_theme_css = str_replace( plugins_url('includes/css/ui-themes/',__FILE__), '', $bestwebsite_theme_css);
    if( $bestwebsite_theme_css !== get_option('bestwebsite_theme_css') ){
        //it uses jQuery UI CSS, so remove trailing .css from value
        $bestwebsite_theme_css = str_replace('.css','', $bestwebsite_theme_css);
    }else{
        //replace custom CSS value
        $bestwebsite_theme_css = str_replace( get_stylesheet_directory_uri()."/plugins/wp-fullcalendar/", '', $bestwebsite_theme_css);
    }
    update_option('bestwebsite_theme_css', $bestwebsite_theme_css);
}

//update version
update_option('bestwebsite_version', bestwebsite_VERSION);