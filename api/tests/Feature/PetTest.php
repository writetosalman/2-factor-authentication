<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Pet;

class PetTest extends TestCase
{

    public function testsPetsAreCreatedCorrectly()
    {
        $payload = [
            'breed' => 'Blood Hound',
            'age' => 13,
            'name' => 'Max',
            'price' => 212,
            'list_date' => '2017-07-12',
        ];

        $this->json('POST', '/api/pet', $payload)
            ->assertStatus(200)
            ->assertJson([
                'id' => 1,
                'breed' => 'Blood Hound',
                'age' => 13,
                'name' => 'Max',
                'price' => 212,
                'list_date' => '2017-07-12'
            ]);
    }

    public function testsPetsAreUpdatedCorrectly()
    {
        $pet = factory(Pet::class)->create([
            'breed' => 'Guppy',
            'age' => 11,
            'name' => 'Bill',
            'price' => 112,
            'list_date' => '2017-06-21',
        ]);

        $payload = [
            'breed' => 'Landy',
            'age' => 10,
            'name' => 'Moti',
            'price' => 1200,
            'list_date' => '2017-04-06',
        ];

        $response = $this->json('PUT', '/api/pet/' . $pet->id, $payload)
            ->assertStatus(200)
            ->assertJson([
                'id' => 1,
                'breed' => 'Landy',
                'age' => 10,
                'name' => 'Moti',
                'price' => 1200,
                'list_date' => '2017-04-06'
            ]);
    }

    public function testsPetsAreDeletedCorrectly()
    {
        $pet = factory(Pet::class)->create([
            'breed' => 'Landy',
            'age' => 10,
            'name' => 'Moti',
            'price' => 1200,
            'list_date' => '2017-04-06',
        ]);

        $this->json('DELETE', '/api/pet/' . $pet->id)
            ->assertStatus(204);
    }

    public function testPetsAreListedCorrectly()
    {
        factory(Pet::class)->create([
            'breed' => 'Landy',
            'age' => 10,
            'name' => 'Moti',
            'price' => 1200,
            'list_date' => '2017-04-06'
        ]);

        factory(Pet::class)->create([
            'breed' => 'Guppy',
            'age' => 11,
            'name' => 'Bill',
            'price' => 112,
            'list_date' => '2017-06-21'
        ]);

        $response = $this->json('GET', '/api/pets')
            ->assertStatus(200)
            ->assertJson([
                [
                    'breed' => 'Landy',
                    'age' => 10,
                    'name' => 'Moti',
                    'price' => 1200,
                    'list_date' => '2017-04-06'
                ],
                [
                    'breed' => 'Guppy',
                    'age' => 11,
                    'name' => 'Bill',
                    'price' => 112,
                    'list_date' => '2017-06-21'
                ]
            ])
            ->assertJsonStructure([
                '*' => ['id', 'breed', 'age', 'name', 'price', 'list_date', 'sale_date', 'created_at', 'updated_at'],
            ]);
    }

}
