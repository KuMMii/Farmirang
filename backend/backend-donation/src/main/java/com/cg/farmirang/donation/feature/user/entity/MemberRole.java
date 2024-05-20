package com.cg.farmirang.donation.feature.user.entity;

public enum MemberRole {
	MEMBER("member"),
	ADMIN("admin"),
	AGENCY("agency"),
	ANONYMOUS("anonymous");

	private final String role;

	MemberRole(String role) {
		this.role = role;
	}
}
