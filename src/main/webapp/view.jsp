<%@ page contentType="text/html; charset=UTF-8" %>
<%--
/**
 * Copyright (c) 2000-2013 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>
<%@page import="com.liferay.portal.util.PortalUtil" %>
<%@page import="com.liferay.portal.kernel.util.ReleaseInfo" %>

<portlet:defineObjects/>
<portlet:actionURL name="sampleAction" var="sampleActionUrl"></portlet:actionURL>
<liferay-theme:defineObjects/>
<%
    String portletStaticPath = PortalUtil.getPathContext() + request.getContextPath();
	String releaseInfo = ReleaseInfo.getReleaseInfo();
%>
<liferay-util:html-top>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
	<link rel="stylesheet" href="<%= portletStaticPath + "/sample/css/sample-portlet.css?t=@timeStamp@" %>" />
	<script type="text/javascript" src="<%= portletStaticPath + "/sample/lib/jquery.min.js?t=@timeStamp@" %>"></script>
    <script type="text/javascript" src="<%= portletStaticPath + "/sample/js/sample-portlet.js?t=@timeStamp@" %>"></script>
</liferay-util:html-top>

<div id="sample-portlet">
	<h1>This is a sample Liferay custom portlet</h1>
	<p>Deployed in <strong><%= releaseInfo %></strong>.</p>
	<p>The portlet should log to console with jQuery when ready.</p>
	<p>Sample portlet action: ${sample}</a>
		<form action="${sampleActionUrl}" method="post">
			<input type="submit" />
		</form>
	</p>
	<h2>Some Liferay portal data:</h2>
	<table border="1" cellpadding="5">
		<tr>
			<td>PortalUtil.getCurrentURL(request) </td>
			<td><%= PortalUtil.getCurrentURL(request) %></td>
		</tr>
		<tr>
			<td>PortalUtil.getCurrenCompletetURL(request) </td>
			<td><%= PortalUtil.getCurrentCompleteURL(request) %></td>
		</tr>
		<tr>
			<td>layout.getFriendlyURL() </td>
			<td><%= layout.getFriendlyURL() %></td>
		</tr>
		<tr>
			<td>theme.getContextPath() </td>
			<td><%= theme.getContextPath() %></td>
		</tr>
	</table>
	<h2>A font awesome sample with portlet CSS based color: <span class="fa fa-hand-spock-o blue"></span></h2>
	<p>Cf. <a href="http://fortawesome.github.io/Font-Awesome/cheatsheet/" target="_blank">Font Awesome Cheatsheet</a></p>
</div>
