package game.security;
/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

    @EnableWebSecurity
    public class SecurityConfig extends WebSecurityConfigurerAdapter {
        // This method allows configuring web based security for specific http requests.

        private final JwtConverter converter;

        public SecurityConfig(JwtConverter converter) {
            this.converter = converter;
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.csrf().disable();

            http.cors();

            http.authorizeRequests()
                    .antMatchers("/authenticate").permitAll()
                    .antMatchers("/create_account").permitAll()
                    // new...
                    .antMatchers("/refresh_token").authenticated()
                    .antMatchers(HttpMethod.GET,
                            "/").permitAll()
                    .antMatchers(HttpMethod.GET,
                            "/").permitAll()
                    .antMatchers(HttpMethod.POST,
                            "/").permitAll()
                    .antMatchers(HttpMethod.PUT,
                            "/").permitAll()
                    .antMatchers(HttpMethod.DELETE,
                            "/api/*").hasAnyRole("ADMIN")
                    .antMatchers("/**").denyAll()
                    // if we get to this point, let's deny all requests
                    .and()
                    .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        }

        @Override
        @Bean
        protected AuthenticationManager authenticationManager() throws Exception {
            return super.authenticationManager();
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

    }
*/