<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ForgotPasswordController extends Controller
{
    /** Show the email request form */
    public function showLinkRequestForm(): View
    {
        return view('auth.passwords.email');
    }

    /** Handle the email submission */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
    
        try {
            $token = Str::random(60);
    
            // Delete existing reset tokens
            DB::table('password_resets')->where('email', $request->email)->delete();
    
            // Store new reset token
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => now(),
            ]);
    
            // Send email
            Mail::send('auth.verify', ['token' => $token], function ($message) use ($request) {
                $message->from(config('mail.from.address'), config('mail.from.name'));
                $message->to($request->email)->subject('Reset Password Notification');
            });
    
            return back()->with('success', 'We have e-mailed your password reset link! :)');
    
        } catch (\Exception $e) {
            \Log::error('Password Reset Email Error: '.$e->getMessage());
            return back()->with('error', 'Failed to send reset email. Please try again.');
        }
    }
}