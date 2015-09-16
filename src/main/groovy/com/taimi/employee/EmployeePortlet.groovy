package com.taimi.employee

import com.liferay.portal.kernel.exception.PortalException
import com.liferay.portal.kernel.exception.SystemException
import com.liferay.portal.kernel.util.ParamUtil
import com.liferay.util.bridges.mvc.MVCPortlet

import javax.portlet.ActionRequest
import javax.portlet.ActionResponse
import javax.portlet.PortletException
import javax.portlet.RenderRequest
import javax.portlet.RenderResponse

// cf. http://www.opensource-techblog.com/2012/08/creating-custom-liferay-mvc-portlet.html
public class EmployeePortlet extends MVCPortlet {

	@Override
	public void render(RenderRequest renderRequest, RenderResponse renderResponse) throws IOException, PortletException {
		println '*** EmployeePortlet RENDER ***'
		super.render(renderRequest, renderResponse)
	}
	
	@Override
	public void processAction(ActionRequest actionRequest, ActionResponse actionResponse) throws IOException, PortletException, PortalException, SystemException{
		ParamUtil.print(actionRequest)
		actionRequest.setAttribute("employee", "Action processed")
	}
}