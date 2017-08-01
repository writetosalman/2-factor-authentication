<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class LoginController extends Controller
{

	public $successStatus = 200;

	/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string
	 *
	 */
	public function login(Request  $request) {

		if ( Auth::attempt(['email' => request('email'), 'password' => request('password')]) ) {
			$user               = Auth::user();
			$success['token']   =  $user->createToken('MyApp')->accessToken;

			if ( authy()->isEnabled($user) ) {
				return response()->json([
											'is2FactorEnabled'  => 'true',
											'auth_id'           => $user->id,
											//'two_factor_id'   => $user->two_factor_options->id,
											'success'           => $user
										], $this->successStatus);
			}
			else {
				// 2 Factor not needed. Just login
				return response()->json(['success' => $success], $this->successStatus);
			}
		}
		else {
			return response()->json(['error'=>'Email &amp; password combination dont match.'], 401);
		}
	}

	/**
	 * Register api
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
										'name'          => 'required',
										'email'         => 'required|email',
										'password'      => 'required',
										'c_password'    => 'required|same:password',
									]);

		if ($validator->fails()) {
			return response()->json(['error'=>$validator->errors()], 401);
		}

		$input = $request->all();
		$input['password']  = bcrypt($input['password']);
		$user               = User::create($input);
		$success['token']   =  $user->createToken('MyApp')->accessToken;
		$success['name']    =  $user->name;

		return response()->json(['success'=>$success], $this->successStatus);
	}

	/**
	 * details api
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function details()
	{
		$user = Auth::user();
		return response()->json(['success' => $user], $this->successStatus);
	}
}