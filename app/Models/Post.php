<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $table = "posts";
    protected $fillable = [
        'user_id', // Add this line
        'title',
        'content',
        // Add any other fields that should be mass assignable
    ];
    public function user()
{
    return $this->belongsTo(User::class);
}

}
