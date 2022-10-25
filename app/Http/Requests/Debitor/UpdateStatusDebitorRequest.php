<?php

namespace App\Http\Requests\Debitor;

use App\Enums\DebitorStatus;
use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rules\Enum;

class UpdateStatusDebitorRequest extends FormRequest
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
            'status' => ['required', new Enum(DebitorStatus::class)],
        ];
    }
}
