<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TrainingsController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::controller(AuthController::class)->group(function() {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('validateToken', 'validateToken');
});

Route::controller(CompanyController::class)->group(function () {
    Route::post('/company/create', 'createCompany');
    Route::post('/company/activate', 'activate');
    Route::post('/company/requestDeactivate', 'requestDeactivate');
});

Route::controller(EmployerController::class)->group(function () {
    Route::post('/employer/dashboard', 'dashboard');
    Route::post('/employer/editcompany', 'editcompany');
    Route::post('/employer/search', 'search');
    Route::post('/employer/inviteUser', 'inviteUser');
    Route::post('/employer/myemployees', 'myEmployees');
    Route::post('/employer/myemployers', 'myEmployers');
    Route::post('/employer/removeUser', 'removeUser');
    Route::post('/employer/trainings', 'mytrainings');
    Route::post('/employer/user', 'user');
    Route::post('/employer/transferOwnership', 'transferOwnership');
    Route::get('/employer/getEmployeeTPass', 'getEmployeeTPass');
    Route::get('/employer/myCompanyUsers', 'myCompanyUsers');
    Route::get('/employer/getSubscriptionContent', 'getSubscriptionContent');
});

Route::controller(EmployeeController::class)->group(function () {
    Route::get('/notifications', 'getNotif');
    Route::post('/acceptCompany', 'acceptCompany');
    Route::post('/rejectCompany', 'rejectCompany');
    Route::post('/updateProfile', 'updateProfile');
});

Route::controller(TrainingsController::class)->group(function () {
    Route::post('/trainings/create', 'create');
    Route::get('/trainings/get', 'get');
    Route::get('/trainings/getById', 'getById');
    Route::post('/trainings/delete', 'delete');
    Route::get('/trainings/getSchedule', 'getSchedule');
    Route::post('/trainings/bulkInsert', 'bulkInsert');
    Route::post('/trainings/deleteTraining', 'deleteTraining');
    Route::post('/trainings/getUsersByTraining', 'getUsersByTraining');
    Route::post('/trainings/completeTraining', 'completeTraining');
    Route::get('/trainings/getAllCompanyTrainings', 'getAllCompanyTrainings');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/admin/users', 'users');
    Route::get('/admin/companies', 'companies');
    Route::get('/admin/approvals', 'approvals');
    Route::get('/admin/announcements', 'announcements');
    Route::post('/admin/approveCompany', 'approveCompany');
    Route::post('/admin/rejectCompany', 'rejectCompany');
    Route::post('/admin/deactivate', 'deactivate');
    Route::post('/admin/activate', 'activate');
    Route::get('/admin/audits', 'audits');
});

Route::controller(PaymentController::class)->group(function () {
    Route::post('/payment/upgrade', 'upgrade');
});

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');//<--- built in, verifies email when clicked in gmail mismo

Route::post('/email/verify/resend', function (Request $request) {
    error_log('CALLED');
    $request->user()->sendEmailVerificationNotification(); //built in sa laravel, resends email verification link to email
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');