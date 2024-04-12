<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class UserModel extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = "user";
    protected $fillable = [
        'email',
        'password'
    ];
    public function posts()
{
    return $this->hasMany(Post::class);
}

}
