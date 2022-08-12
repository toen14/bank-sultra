<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

use App\Enums\UserRole;
use App\Enums\UserStatus;

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
            'status'            => [Rule::in([
                UserStatus::Aktif->value,
                UserStatus::NonAktif->value
            ])],
        ];
    }
}
