<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

use App\Enums\DebitorStatus;

class UpdateDebitorRequest extends FormRequest
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
            'name' => 'string',
            'jenis_pengurusan' => 'string',
            'data_agunan' => 'string',
            'cabang_id' => 'numeric',
            'nomor' => 'string',
            'status' => [new Enum(DebitorStatus::class)],
            'alamat_id' => 'numeric',
            'notaris_id' => 'numeric',
            'tanggal_penyerahan' => 'date',
            'tanggal_berakhir' => 'date',
        ];
    }
}
