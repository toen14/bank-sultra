<?php

namespace App\Http\Requests\Debitor;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\User;
use App\Enums\UserRole;

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
            'alamat' => 'required|string',
            'notaris_id' => ['required', 'array', function ($attribute, $notarisIds, $fail) {
                $listNotaris = array_map(function($notaris) {
                    return $notaris['id'];
                }, User::where('role', '=', UserRole::Notaris->value)->get()->toArray());

                foreach ($notarisIds as $notarisId) {
                    if (!in_array($notarisId, $listNotaris)) {
                        $fail("The notaris ids is don't exist. " . json_encode($listNotaris));
                    }
                }
            }],
            'tanggal_penyerahan' => 'date',
            'tanggal_berakhir' => 'date',
            'nilai_pengikatan' => 'numeric',
            'plafond_kredit' => 'numeric',
            'no_surat' => '',
        ];
    }
}
