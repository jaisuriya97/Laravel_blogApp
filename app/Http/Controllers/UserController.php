<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\UserModel;
use Illuminate\Http\Request;


class UserController extends Controller
{
    public function register(Request $request){
        
        $user = UserModel::create([
            'email'=>$request->email,
            'password'=>$request->pass
        ]);
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            "message"=>"user Added Successfully",
            "token" => $token
        ]);
    }

    public function login(Request $request){
        $user = UserModel::where('email', $request->email)->first();
        if (!$user || $request->password !== $user->pass) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('authToken')->plainTextToken;
    
        return response()->json([
            'token' => $token
        ], 200);
    }


    public function dashboard(Request $request){    
        $user = $request->user();
        if ($user) {
            $userData = UserModel::where('email', $user->email)->first();
            $post = Post::where('user_id',$userData->id)->get();
            if ($userData) {
                return response()->json([
                    'data' => $userData,
                    'post'=>$post
                ]);
            } else {
                return response()->json([
                    'message' => 'User data not found',
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
    }
    
    public function stores(Request $request){
        $user = $request->user();
        $post = Post::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'content' => $request->content
        ]);
        return response()->json([
            "message" => "post added successfully"
        ], 201);
    }
    
    public function allPost(){
        $posts = Post::with('user')->get();
        return response()->json($posts);
    }



    public function delete($id) {
        $post = Post::find($id);
        
        if(!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->delete();
        
        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
    
}
