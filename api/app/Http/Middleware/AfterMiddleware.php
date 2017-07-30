<?php

namespace App\Http\Middleware;

use Closure;

class AfterMiddleware
{
	public function handle($request, Closure $next)
	{
		$response = $next($request);

		// Perform action
		$response->header('Access-Control-Allow-Origin', '*');

		return $response;
	}
}