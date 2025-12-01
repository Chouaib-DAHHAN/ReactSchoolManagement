<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use App\Http\Resources\StudentResource;
use App\Models\StudentParent;
use App\Models\User;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $students =  User::all();
       return StudentResource::collection($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {

    //   $formData = $request->validated();
    //   $formData['last_login_date'] = now()->toDateTimeString();
    //   $parent = StudentParent::create($formData);
    //   $response = new StudentParentResource($parent);
    //   return response()->json([
    //     'parent'=> $response,
    //     'message'=> __('parent created successfully')
    //   ]);
      
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {
    //     $parent->update($request->validated());
    //     return response()->json([
    //     'parent'=> $parent,
    //     'message'=> __('parent updated successfully')
    //   ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $parent)
    {
        // $parent->delete();
        // return new StudentParentResource($parent);
    }
}
