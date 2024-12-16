<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->query('user_id');

        $books = $user_id ? Book::where('user_id', $user_id)->get() : NULL;

        return response()->json($books);
    }

    public function store(Request $request)
    {   try{         
        // Validate the incoming request data
         $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'note' => 'nullable|string',
            'genre' => 'required|string|max:255',
            'status' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'fileName' => 'required|string',
            'user_id' => 'required|integer'
        ]);

        // Handle file upload
        $image = $request->file('image');
        $fileName = $request->input('fileName');
        $filePath = $image->storeAs('images/books', $fileName, 'public');

        // Store the book data in the database
        $book = Book::create([
            'title' => $validatedData['title'],
            'author' => $validatedData['author'],
            'genre' => $validatedData['genre'],
            'note' => $validatedData['note'],
            'status' => $validatedData['status'],
            'image' => $filePath, // Use 'image' instead of 'image_path'
            'user_id' => $validatedData['user_id']
        ]);

            return response()->json([
                'message' => 'Book added successfully',
                'book' => $book
            ], 201); // 201 Created status code
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error status code
        }
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
    
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'genre' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string',
            'note' => 'sometimes|string|nullable',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'user_id' => 'nullable|integer',
        ]);
    
        $data = $request->only(['title', 'author', 'genre', 'status', 'note', 'user_id']);
    
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = $request->input('fileName', $file->getClientOriginalName());
            $path = $file->storeAs('images/books', $fileName, 'public');
            $data['image'] = $path;
        }
    
        // // Log the data being updated for debugging
        // Log::info('Updating book with data: ', $data);
    
        $book->update($data);
    
        return response()->json(['message' => 'Book updated successfully', 'book' => $book]);
    }
    

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }
    
}
