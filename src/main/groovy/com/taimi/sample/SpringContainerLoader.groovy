package com.taimi.sample

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.apache.log4j.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class SpringContainerLoader implements ServletContextListener {
	private static Logger log = Logger.getLogger(SpringContainerLoader.class);
	private static volatile ApplicationContext ctx = null;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		log.info("ServletContextListener destroyed");
		ctx = null;
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		log.info("ServletContextListener started");
		if(ctx == null) {
			initCtx();
		}
	}

	public static ApplicationContext getApplicationContext() {
		if(ctx == null) {
			initCtx();
		}
		return ctx;
	}
	
	private static void initCtx() {
		try {
			ctx = new ClassPathXmlApplicationContext("beans.xml");
		} catch (Exception ex) {
			log.fatal("Loading spring bean context failed.", ex);
			throw new RuntimeException("Cannot load bean context!",ex);
		}
	}
}

