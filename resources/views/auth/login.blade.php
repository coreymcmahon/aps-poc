@extends('layouts.master')

@section('content')
    <form action="{{ url('/auth/login') }}" method="POST">

        <!-- @TODO: implement csrf protection -->
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

        <div class="form-group">
            &nbsp;
        </div>
        <div class="form-group">
            <input type="text" placeholder="Enter your email" class="form-control"/>
        </div>
        <div class="form-group">
            <input type="password" placeholder="Password..." class="form-control"/>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary pull-right btn-lg">
                <span class="glyphicon glyphicon-log-in"> </span> Enter
            </button>
        </div>
    </form>
@stop