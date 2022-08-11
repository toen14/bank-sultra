<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Enums\UserRole;

class UpdateUserRequest extends FormRequest
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
            'name'              => 'string',
            'role'              => [Rule::in([
                UserRole::Apraisal->value,
                UserRole::Notaris->value
            ])],
            'alamat'            => 'string',
            'email'             => 'email',
            'cabang_id'         => 'numeric',
            'oldPassword'       => 'max:200',
            'password'          => 'max:200',
            'tanggal_berakhir'  => 'date',
        ];
    }
}
