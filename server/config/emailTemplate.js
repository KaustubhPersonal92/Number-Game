var emailContainerHeaderString = '<!DOCTYPE html>';
emailContainerHeaderString += '<html lang="en-US">';
emailContainerHeaderString += '<head>';
emailContainerHeaderString += '<meta charset="utf-8">';
emailContainerHeaderString += '</head>';
emailContainerHeaderString += '<body>';
emailContainerHeaderString += '<header></header>';
emailContainerHeaderString += '<div>';

var emailContainerFooterString = '</div>';

emailContainerFooterString += '<div>';
emailContainerFooterString += '<p>Regards,</p>';

emailContainerFooterString += '<div>Number Game</div>';

emailContainerFooterString += '</div>';
emailContainerFooterString += '</body>';
emailContainerFooterString += '</html>';

var usercredentailsEmailBody = '<div>';
usercredentailsEmailBody += 'Dear %userfullname%, <br /><br />';
usercredentailsEmailBody += 'Thank you playing number game here is your result.<br /><br />';
usercredentailsEmailBody += 'Result : %result%<br />';
usercredentailsEmailBody += '</div>';

module.exports = {
	userResultSubject:'Your Number Game Result.',
	usercredentailsEmailBody:usercredentailsEmailBody,
	emailContainerHeaderString: emailContainerHeaderString,
	emailContainerFooterString: emailContainerFooterString
};