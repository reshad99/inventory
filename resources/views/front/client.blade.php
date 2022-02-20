@extends('front.layouts.master')
@section('title', "Clients")

@section('content')
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Striped Table</h4>
        <p class="card-description">
          Add class <code>.table-striped</code>
        </p>
        <div class="d-sm-flex justify-content-between align-items-start">
            <div>
              <h4 class="card-title card-title-dash">Pending Requests</h4>
             <p class="card-subtitle card-subtitle-dash">You have 50+ new requests</p>
            </div>
            <div>
              <button class="btn btn-primary btn-md text-white font-weight-bold" type="button"><i class="mdi mdi-account-plus"></i> <span class="mb-6"><b>Add new member</b></span></button>
            </div>
          </div>
        <div class="table-responsive mt-1">
          <table class="table table-striped clienttable">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                 Purchase Amount
                </th>
                <th>
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="clients">
              
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    
@endsection