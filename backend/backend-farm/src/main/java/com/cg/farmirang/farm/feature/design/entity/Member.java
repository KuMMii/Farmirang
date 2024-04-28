package com.cg.farmirang.farm.feature.design.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Integer id;

	private String nickname;

	@OneToMany(mappedBy = "member")
	private List<Design> designs;

	@Builder
	public Member(String nickname) {
		this.nickname = nickname;
	}
}
