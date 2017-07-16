package com.dzui.shoesshop.configurations;

import java.io.IOException;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.dzui.shoesshop.entities.JwtUser;
import com.dzui.shoesshop.utilities.JwtUtility;

import io.jsonwebtoken.JwtException;

@Component
@PropertySource("classpath:global.properties")
public class AuthenticationFilter implements Filter {
	@Autowired
	private JwtUtility jwtUtility;

	@Value("${jwt.auth.header}")
	private String authHeader;
	
	@Override
	public void destroy() {}
	
	@Override
	public void init(FilterConfig arg0) throws ServletException {}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
        if ("OPTIONS".equals(((HttpServletRequest) request).getMethod())) {
        	chain.doFilter(request, response);
        } else {
        	final HttpServletRequest httpRequest = (HttpServletRequest) request;
            final HttpServletResponse httpResponse = (HttpServletResponse) response;
            final String authHeaderVal = httpRequest.getHeader("Authorization");

            httpResponse.addHeader("Access-Control-Allow-Origin", "http://10.0.0.178:8889");
            
            if (null==authHeaderVal)
            {
            	throw new ServletException("Missing or invalid Authorization header");
            }
     
            try
            {
                JwtUser jwtUser = jwtUtility.getUser(authHeaderVal);
                
                if(jwtUser.getExpire().after(new Date())) {
                	httpRequest.setAttribute("jwtUser", jwtUser);
                	chain.doFilter(httpRequest, httpResponse);
                }
                else {
                	throw new ServletException("Missing or invalid Authorization header");
                }
            }
            catch(JwtException e)
            {
            	throw new ServletException("Missing or invalid Authorization header");
            }
        }
	}

	

}
