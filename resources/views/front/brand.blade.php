@extends('front.layouts.master')
@section('title', 'Brands')


@section('content')


<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Striped Table</h4>
        <p class="card-description">
          Add cladd <code>.table-striped</code>
        </p>
        <div class="float-left">
          <input type="search" placeholder="Search" id="search">
        </div>
        <div class="float-right">
          <button class="btn btn-primary btn-md text-white font-weight-bold" type="button" class="btn btn-primary" id="add" data-toggle="modal" data-target="#exampleModal">
          <i class="mdi mdi-account-plus"></i> <span class="mb-6"><b>Add new member</b></span></button>
        </div>
        <div class="table-responsive">
          <table class="table table-striped brandtable">
            <thead>
              <tr>
                <th>
                  Image
                </th>
                <th>
                  Brand
                  <a href="javascript:void(0)" class="order" data-order="ASC" data-column="brand_name"><i class="mdi mdi-arrow-down"></i></a>
                  <a href="javascript:void(0)" class="order" data-order="DESC" data-column="brand_name"><i class="mdi mdi-arrow-up"></i></a>
                </th>
                
                <th>
                  Sale Progress
                </th>
                <th>
                  Created Date
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="brands">
              
            </tbody>
          </table>
          <div class="pages">
              
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Yeni xəbər əlavə et</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="brandForm" action="javascript:void(0)" method="POST" class="form-horizontal" enctype="multipart/form-data">
        @csrf
      <input type="hidden" id="id" name="id">
      <div class="form-group">
        <label for="name">Brand Name</label>
      <input type="text" class="form-control" name="name" id="name">
      <span class="text-danger error-text name_error"></span>
      </div>
      <div class="form-group">
        <label for="photo">Image</label>
      <input type="file" class="form-control" name="photo" id="photo">
      <span class="text-danger error-text photo_error"></span>
      <input type="hidden" name="hidden_image" id="hidden_image">
      </div>
      <img id="modal-preview" src="https://via.placeholder.com/150" alt="Preview" class="form-group hidden" width="150" >
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary save">Save changes</button>
        </form>
      </div>
      </div>
    </div>
    </div>

    <script>
  
    </script>
@endsection