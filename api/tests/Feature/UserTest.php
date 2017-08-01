<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    /**
     * This function registers a random user and checks if you can login using web interface
     */
    public function testUsersCanLogin() {

        $user = factory(\App\User::class)->create([
            'password'  => bcrypt('asdf1234')
        ]);

        $this->post('login', [
            'email'     => $user->email,
            'password'  => 'asdf1234'
        ]);

        //$this->followRedirects()->assertResponseOk();
        $this->assertDatabaseHas('users', [                 // seeInDatabase() is no longer available in 5.4
            'email'     => $user->email                           // You can see this link to upgrade from 5.3 to 5.4
        ]);                                                       // https://adamwathan.me/2017/02/02/upgrading-your-test-suite-for-laravel-54/

        $this->assertTrue(auth()->check());
    }
}
