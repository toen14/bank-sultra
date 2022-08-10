<?php

namespace App\Http\Requests\Debitor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

use App\Enums\DebitorStatus;
use App\Enums\UserRole;
use App\Models\User;

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
            'alamat' => 'string',
            'notaris_id' => ['array',  function ($attribute, $notarisIds, $fail) {
                $listNotaris = array_map(function ($notaris) {
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
            'nilai_pengikatan' => '',
            'plafond_kredit' => '',
            'no_surat' => '',
        ];
    }
}
