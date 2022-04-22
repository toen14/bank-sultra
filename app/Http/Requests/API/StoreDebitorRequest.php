<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

use App\Enums\DebitorStatus;

class StoreDebitorRequest extends FormRequest
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
            'name' => 'required',
            'jenis_pengurusan' => 'required',
            'data_agunan' => 'required',
            'cabang_id' => 'required|numeric',
            'nomor' => 'required',
            'status' => ['required', new Enum(DebitorStatus::class)],
            'alamat_id' => 'required|numeric',
            'notaris_id' => 'required|numeric',
            'tanggal_penyerahan' => 'required|date',
            'tanggal_berakhir' => 'required|date',
        ];
    }
}
