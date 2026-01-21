<!-- ======== App Menu ======= -->
<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="{{ route('home') }}" class="logo logo-dark">
            <span class="logo-sm">
                <img src="{{ asset('assets/images/logo-sm.png') }}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{ asset('assets/images/logo-dark.png') }}" alt="" height="17">
            </span>
        </a>
        <!-- Light Logo-->
        <a href="{{ route('home') }}" class="logo logo-light">
            <span class="logo-sm">
                <img src="{{ asset('assets/images/logo-sm.png') }}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{ asset('assets/images/logo-light.png') }}" alt="" height="17">
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>
    <div class="dropdown sidebar-user m-1 rounded">
        <button type="button" class="btn material-shadow-none" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="d-flex align-items-center gap-2">
                <img class="rounded header-profile-user" src="{{ asset('assets/images/users/avatar-1.jpg') }}" alt="Header Avatar">
            <span class="text-start">
                <span class="d-block fw-medium sidebar-user-name-text">{{ Auth::user()->name }}</span>
                    <span class="d-block fs-14 sidebar-user-name-sub-text">
                        <i class="ri ri-circle-fill fs-10 text-success align-baseline"></i>
                        <span class="align-middle">Online</span>
                    </span>
                </span>
            </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
            <!-- item-->
            <h6 class="dropdown-header">Welcome {{ Auth::user()->name }}!</h6>
                <a class="dropdown-item" href="{{ route('pages/profile') }}"><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Profile</span></a>
                <a class="dropdown-item" href="{{ route('pages/faqs') }}"><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Help</span></a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="{{ route('pages/profile') }}"><i class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Balance : <b>$5971.67</b></span></a>
                <a class="dropdown-item" href=""><span class="badge bg-success-subtle text-success mt-1 float-end">New</span><i class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Settings</span></a>
                <a class="dropdown-item" href="{{ route('lock-activate') }}"><i class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span class="align-middle">Lock screen</span></a>
                <a class="dropdown-item" href="{{ route('logout') }}"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span class="align-middle" data-key="t-logout">Logout</span></a>
            </div>
    </div>
    <div id="scrollbar">
        <div class="container-fluid">
            <div id="two-column-menu"></div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="menu-title"><span data-key="t-menu">Menu</span></li>
                 @foreach(config('sidebar.menu') as $menu)
                    @php $isActive = request()->is($menu['active']); @endphp
                    <li class="nav-item">
                        <a class="nav-link menu-link {{ $isActive ? 'active' : 'collapsed' }}" 
                           href="#{{ $menu['id'] }}" 
                           data-bs-toggle="collapse" 
                           role="button" 
                           aria-expanded="{{ $isActive ? 'true' : 'false' }}">
                            <i class="{{ $menu['icon'] }}"></i> 
                            <span data-key="{{ $menu['key'] }}">{{ $menu['title'] }}</span>
                        </a>
                        
                        <div class="collapse menu-dropdown {{ $isActive ? 'show' : '' }}" id="{{ $menu['id'] }}">
                            <ul class="nav nav-sm flex-column">
                                @foreach($menu['submenu'] as $sub)
                                    @if(isset($sub['items']))
                                        @php $isSubActive = request()->is($sub['active']); @endphp
                                        <li class="nav-item">
                                            <a href="#{{ $sub['id'] }}" 
                                               class="nav-link {{ $isSubActive ? 'active' : 'collapsed' }}" 
                                               data-bs-toggle="collapse" 
                                               role="button" 
                                               aria-expanded="{{ $isSubActive ? 'true' : 'false' }}">
                                                <span data-key="{{ $sub['key'] }}">{{ $sub['title'] }}</span>
                                            </a>
                                            <div class="collapse menu-dropdown {{ $isSubActive ? 'show' : '' }}" id="{{ $sub['id'] }}">
                                                <ul class="nav nav-sm flex-column">
                                                    @foreach($sub['items'] as $item)
                                                        <li class="nav-item">
                                                            <a href="{{ url($item['route']) }}" 
                                                               class="nav-link {{ request()->is($item['route']) ? 'active' : '' }}"
                                                               data-key="{{ $item['key'] }}">
                                                                {{ $item['label'] }}
                                                            </a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        </li>
                                    @else
                                        <li class="nav-item">
                                            <a href="{{ url($sub['route']) }}" 
                                               class="nav-link {{ request()->is($sub['route']) ? 'active' : '' }}"
                                               data-key="{{ $sub['key'] }}">
                                                {{ $sub['label'] }}
                                            </a>
                                        </li>
                                    @endif
                                @endforeach
                            </ul>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
        <!-- Sidebar -->
    </div>
    <div class="sidebar-background"></div>
</div>