package com.dzui.shoesshop.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:global.properties")
public class MainConfiguration {
	@Autowired
	private AuthenticationFilter authenticationFilter;
	
	@Bean
	public FilterRegistrationBean authenticationFilterBean() {
		FilterRegistrationBean filterBean = new FilterRegistrationBean();
		filterBean.setFilter(authenticationFilter);
		filterBean.addUrlPatterns("/api/*");
		filterBean.setEnabled(Boolean.TRUE);
		filterBean.setName("Authentication Filter");
		filterBean.setAsyncSupported(Boolean.TRUE);
		  
		return filterBean;
	}
}
