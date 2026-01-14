package com.mobileback.mobileback.security;

import com.mobileback.mobileback.dao.AppUserDao;
import com.mobileback.mobileback.models.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    protected final AppUserDao appUserDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<AppUser> optionalAppUser = appUserDao.findByEmail(email);

        if(optionalAppUser.isPresent()) {
            return new AppUserDetails(optionalAppUser.get());
        }

        throw new UsernameNotFoundException(email);
    }
}
