<?php

namespace App\Http\Requests\API\NoteUser;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

use App\Enums\NoteUserStatus;

class UpdateNoteUserRequest extends FormRequest
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
            'user_id' => 'numeric',
            'note_id' => 'numeric',
            'status' => [new Enum(NoteUserStatus::class)],
        ];
    }
}
