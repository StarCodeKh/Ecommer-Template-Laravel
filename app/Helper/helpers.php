<?php

/** Set active class for sidebar menu */
function set_active($routes)
{
    $current = Request::path();

    if (is_array($routes)) {
        return in_array($current, $routes) ? 'active' : '';
    }

    return $current === $routes ? 'active' : '';
}

/** Determine if sidebar dropdown should be expanded */
function set_expanded($routes)
{
    $current = Request::path();

    foreach ((array) $routes as $route) {
        if ($current === $route) {
            return 'true';
        }
    }

    return 'false';
}

/** Set show class for sidebar dropdown */
function set_show($routes)
{
    $current = Request::path();

    if (is_array($routes)) {
        return in_array($current, $routes) ? 'show' : '';
    }

    return $current === $routes ? 'show' : '';
}