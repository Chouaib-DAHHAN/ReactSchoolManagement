<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentParentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    
    {
        $parentId = $this->route('parent')->id;

        return [
        'firstname'=>'required | max:60',
        'lastname'=>'required | max:60',
        'date_of_birth'=>'required | date',
        // 'last_login_date'=>'required',
        'gender'=>['required' , Rule::in(['m', 'f'])],
        'blood_type'=> ['required' , Rule::enum(BloodEnum::class)],
        'address'=>'required | max:255',
        'phone' => [
                'required',
                'max:10',
                Rule::unique('student_parents', 'phone')->ignore($parentId),
            ],
            'email' => [
                'required',
                'email',
                'max:60',
                Rule::unique('student_parents', 'email')->ignore($parentId),
            ],
        ];
    }
}
