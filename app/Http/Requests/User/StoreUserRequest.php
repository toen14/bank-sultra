<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

use App\Enums\UserRole;
use App\Enums\UserStatus;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'      => 'required|string',
            'role'      => ['required', Rule::in([
                UserRole::Apraisal->value, 
                UserRole::Notaris->value
            ])],
            'alamat'    => 'required|string',
            'email'     => 'required|email',
            'password'  => 'required|string',
            'cabang_id' => 'required|numeric',
            'tanggal_berakhir' => 'required_if:role,' .  UserRole::Notaris->value . '|date',
            'status'    => [new Enum(UserStatus::class)]
        ];
    }
}
